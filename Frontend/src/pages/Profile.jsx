import { useEffect, useState } from 'react'
import { updateProfile } from '../api/api.js'
import styles from './Profile.module.css'

export default function Profile({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState(currentUser || {})
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => setForm(currentUser || {}), [currentUser])
  if (!currentUser) return <section className={styles.profilePage}><p>Please log in to view your profile.</p></section>

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => { if (['id', 'username', 'profileImage'].includes(key) === false && value !== undefined) payload.append(key, value) })
    if (image) payload.append('profileImage', image)
    try {
      const { data } = await updateProfile(payload)
      setCurrentUser(data.user)
      setMessage('Profile updated successfully.')
      setImage(null)
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to update profile.')
    } finally {
      setLoading(false)
    }
  }

  return <section className={styles.profilePage}>
    <div className={styles.profileHeader}><div className={styles.avatar}>{currentUser.profileImage ? <img src={currentUser.profileImage} alt="Profile" /> : currentUser.fullName?.charAt(0).toUpperCase()}</div><div><p className={styles.eyebrow}>API-backed account</p><h1>{currentUser.fullName}</h1><p>{currentUser.email}</p></div></div>
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <label>Full name<input name="fullName" value={form.fullName || ''} onChange={handleChange} required /></label>
      <label>Mobile<input name="mobile" value={form.mobile || ''} onChange={handleChange} required /></label>
      <label>College<input name="college" value={form.college || ''} onChange={handleChange} required /></label>
      <label>Branch<input name="branch" value={form.branch || ''} onChange={handleChange} required /></label>
      <label>Graduation year<input name="graduationYear" type="number" value={form.graduationYear || ''} onChange={handleChange} required /></label>
      <label className={styles.fullWidth}>Skills<textarea name="skills" value={form.skills || ''} onChange={handleChange} /></label>
      <label className={styles.fullWidth}>Profile image<input type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] || null)} /></label>
      <div className={styles.fullWidth}><button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save profile'}</button></div>
    </form>
    {message && <p className={styles.success}>{message}</p>}{error && <p className={styles.error}>{error}</p>}
  </section>
}
