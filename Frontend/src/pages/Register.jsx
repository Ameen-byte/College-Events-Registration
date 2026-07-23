import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import InputField from '../components/InputField.jsx'
import { registerUser } from '../api/api.js'
import styles from './Register.module.css'

const initialState = { fullName: '', email: '', password: '', confirmPassword: '', mobile: '', college: '', branch: '', graduationYear: '', skills: '' }

export default function Register({ onAuthenticated }) {
  const [form, setForm] = useState(initialState)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    if (form.password !== form.confirmPassword) return setError('Passwords must match.')
    setLoading(true)
    try {
      const { data } = await registerUser({ ...form, graduationYear: Number(form.graduationYear) })
      onAuthenticated(data.user, data.token)
      setMessage('Account created. Opening your dashboard...')
      setTimeout(() => navigate('/dashboard', { replace: true }), 500)
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create your account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.registerPage}><div className={styles.formCard}>
      <h2>Create student account</h2><p>Use your account to register for events and manage your profile.</p>
      <form onSubmit={handleSubmit} noValidate>
        <InputField label="Full name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Jane Doe" />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@example.com" />
        <InputField label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} placeholder="9876543210" />
        <div className={styles.columnRow}><InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 8 characters" /><InputField label="Confirm password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" /></div>
        <InputField label="College" name="college" value={form.college} onChange={handleChange} placeholder="Your college" />
        <div className={styles.columnRow}><InputField label="Branch" name="branch" value={form.branch} onChange={handleChange} placeholder="Computer Science" /><InputField label="Graduation year" name="graduationYear" type="number" value={form.graduationYear} onChange={handleChange} placeholder="2027" /></div>
        <div className={styles.field}><label htmlFor="skills">Skills</label><textarea id="skills" name="skills" value={form.skills} onChange={handleChange} placeholder="JavaScript, React, HTML" /></div>
        <div className={styles.formActions}><Button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</Button></div>
        {message && <p className={styles.success}>{message}</p>}{error && <p className={styles.error}>{error}</p>}
      </form>
    </div></section>
  )
}
