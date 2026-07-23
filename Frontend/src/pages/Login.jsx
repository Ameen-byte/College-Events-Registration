import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import InputField from '../components/InputField.jsx'
import { loginUser } from '../api/api.js'
import styles from './Login.module.css'

export default function Login({ onAuthenticated }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const { data } = await loginUser(form)
      onAuthenticated(data.user, data.token)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Unable to connect to the server.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.loginPage}>
      <div className={styles.card}>
        <h2>Login</h2>
        <p>Access your event registrations and profile.</p>
        <form onSubmit={handleSubmit} noValidate>
          <InputField label="Email or Username" name="email" value={form.email} onChange={handleChange} placeholder="student@example.com" />
          <InputField label="Password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Enter your password" />
          <label className={styles.toggleRow}><input type="checkbox" checked={showPassword} onChange={() => setShowPassword((value) => !value)} /> Show password</label>
          <div className={styles.actions}><Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</Button><Button type="button" onClick={() => setForm({ email: '', password: '' })}>Clear</Button></div>
          {message && <p className={styles.error}>{message.text}</p>}
        </form>
      </div>
    </section>
  )
}
