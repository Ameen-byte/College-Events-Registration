import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import InputField from '../components/InputField.jsx'
import styles from './Login.module.css'

export default function Login({ students, setCurrentUser, setIsAuthenticated }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage(null)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      const lookupValue = form.email.trim().toLowerCase()
      const matchedUser = students.find(
        (student) =>
          (student.email === lookupValue || student.username === lookupValue) &&
          student.password === form.password,
      )

      if (matchedUser) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting to dashboard…' })
        setCurrentUser(matchedUser)
        setIsAuthenticated(true)
        setTimeout(() => navigate('/dashboard'), 600)
      } else {
        setMessage({ type: 'error', text: 'Invalid email, username, or password.' })
      }
    }, 2000)
  }

  const handleClear = () => {
    setForm({ email: '', password: '' })
    setMessage(null)
  }

  return (
    <section className={styles.loginPage}>
      <div className={styles.card}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Email or Username"
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            placeholder="student@example.com or jane_doe"
          />
          <InputField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <div className={styles.toggleRow}>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
              Show Password
            </label>
            <button type="button" className={styles.forgotButton}>
              Forgot Password?
            </button>
          </div>
          <div className={styles.actions}>
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </Button>
            <Button type="button" onClick={handleClear}>
              Clear
            </Button>
          </div>
          {message && (
            <p className={message.type === 'success' ? styles.success : styles.error}>
              {message.text}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
