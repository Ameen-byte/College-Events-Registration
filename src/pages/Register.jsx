import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import InputField from '../components/InputField.jsx'
import styles from './Register.module.css'

const initialState = {
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dob: '',
  college: '',
  branch: '',
  graduationYear: '',
  skills: '',
  terms: false,
}

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)

const validateMobile = (mobile) => /^\d{10}$/.test(mobile)

export default function Register({ setStudents }) {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.fullName.trim()) nextErrors.fullName = 'Full Name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    else if (!validateEmail(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.mobile.trim()) nextErrors.mobile = 'Mobile Number is required.'
    else if (!validateMobile(form.mobile)) nextErrors.mobile = 'Enter a 10 digit mobile number.'
    if (!form.password) nextErrors.password = 'Password is required.'
    else if (!validatePassword(form.password))
      nextErrors.password = 'Password must be 8+ chars, uppercase, lowercase, number and special char.'
    if (!form.confirmPassword) nextErrors.confirmPassword = 'Confirm Password is required.'
    else if (form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Passwords must match.'
    if (!form.terms) nextErrors.terms = 'You must accept terms and conditions.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSuccess('')
    if (!validate()) return

    const username = form.fullName.trim().toLowerCase().replace(/\s+/g, '_')

    const newStudent = {
      id: `${Date.now()}`,
      username,
      ...form,
    }

    setStudents((current) => [...current, newStudent])
    setSuccess('Registration successful! Redirecting to login...')
    setForm(initialState)
    setErrors({})
    setTimeout(() => navigate('/login'), 800)
  }

  const handleReset = () => {
    setForm(initialState)
    setErrors({})
    setSuccess('')
  }

  return (
    <section className={styles.registerPage}>
      <div className={styles.formCard}>
        <h2>Student Registration</h2>
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="Jane Doe"
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="student@example.com"
          />
          <InputField
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={form.mobile}
            onChange={handleChange}
            error={errors.mobile}
            placeholder="9876543210"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Create a password"
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Repeat your password"
          />
          <div className={styles.columnRow}>
            <div className={styles.field}>
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Choose</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="dob">Date of Birth</label>
              <input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} />
            </div>
          </div>
          <InputField
            label="College Name"
            name="college"
            value={form.college}
            onChange={handleChange}
            placeholder="ABC College of Engineering"
          />
          <InputField
            label="Branch"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            placeholder="Computer Science"
          />
          <InputField
            label="Graduation Year"
            name="graduationYear"
            type="number"
            value={form.graduationYear}
            onChange={handleChange}
            placeholder="2027"
          />
          <div className={styles.field}>
            <label htmlFor="skills">Skills</label>
            <textarea
              id="skills"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="JavaScript, React, HTML"
            />
          </div>
          <div className={styles.termsRow}>
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              I accept the terms and conditions.
            </label>
            {errors.terms && <small className={styles.error}>{errors.terms}</small>}
          </div>
          <div className={styles.formActions}>
            <Button type="submit">Register</Button>
            <Button type="button" onClick={handleReset}>Reset</Button>
          </div>
          {success && <p className={styles.success}>{success}</p>}
        </form>
      </div>
    </section>
  )
}
