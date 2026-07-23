import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import '../styles/Registration.css'

const initialValues = {
  fullName: '',
  collegeName: '',
  email: '',
  branch: '',
  mobile: '',
  graduationYear: '',
  password: '',
  skills: '',
  confirmPassword: '',
  resume: '',
  gender: '',
  acceptTerms: false,
  dob: '',
}

function Registration({ onBack }) {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [submittedData, setSubmittedData] = useState(null)

  const navLinks = ['Home', 'Events', 'Register']
  const sidebarItems = ['Dashboard', 'Upcoming Events', 'My Registrations', 'Announcements']

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? value : value,
    }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSuccessMessage('')
    setSubmittedData(null)
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!formData.collegeName.trim()) nextErrors.collegeName = 'College name is required.'
    if (!formData.branch) nextErrors.branch = 'Please select a branch.'
    if (!formData.graduationYear) nextErrors.graduationYear = 'Graduation year is required.'
    if (!formData.skills.trim()) nextErrors.skills = 'Please add your key skills.'
    if (!formData.gender) nextErrors.gender = 'Please select a gender.'
    if (!formData.dob) nextErrors.dob = 'Please choose your date of birth.'

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.mobile.trim()) {
      nextErrors.mobile = 'Mobile number is required.'
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      nextErrors.mobile = 'Mobile number must contain exactly 10 digits.'
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required.'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      nextErrors.password = 'Password must be at least 8 characters with one uppercase, one lowercase, one number and one special character.'
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    if (!formData.acceptTerms) {
      nextErrors.acceptTerms = 'You must accept the terms and conditions to register.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      return
    }

    const submission = {
      ...formData,
      resume: formData.resume || 'No file uploaded',
    }

    setSubmittedData(submission)
    setSuccessMessage('Registration successful! Your details have been captured.')
    setErrors({})
    setFormData(initialValues)
  }

  const handleReset = () => {
    setFormData(initialValues)
    setErrors({})
    setSuccessMessage('')
    setSubmittedData(null)
  }

  return (
    <div className="app-shell registration-page">
      <Navbar brand="College Events Registration" links={navLinks} />

      <div className="content-layout">
        <Sidebar items={sidebarItems} />

        <main className="main-content">
          <section className="registration-card">
            <div className="registration-header">
              <div>
                <p className="eyebrow">Student Registration</p>
                <h2>Join the next campus event</h2>
                <p>Fill in the details below to register for exciting activities and opportunities.</p>
              </div>
              <Button label="Back to Home" variant="secondary" onClick={onBack} />
            </div>

            <form className="registration-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your Name" />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="collegeName">College Name</label>
                  <input id="collegeName" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="ABC Institute of Technology" />
                  {errors.collegeName && <span className="error-text">{errors.collegeName}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="student@email.com" />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="branch">Branch</label>
                  <select id="branch" name="branch" value={formData.branch} onChange={handleChange}>
                    <option value="">Select branch</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Civil">Civil</option>
                  </select>
                  {errors.branch && <span className="error-text">{errors.branch}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} placeholder="10-digits number" />
                  {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="graduationYear">Graduation Year</label>
                  <input id="graduationYear" name="graduationYear" type="number" value={formData.graduationYear} onChange={handleChange} placeholder="Year of Graduation" />
                  {errors.graduationYear && <span className="error-text">{errors.graduationYear}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter a strong password" />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <div className="field-group full-width">
                  <label htmlFor="skills">Skills</label>
                  <input id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, UI/UX" />
                  {errors.skills && <span className="error-text">{errors.skills}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="resume">Resume Upload</label>
                  <input id="resume" name="resume" type="file" onChange={handleChange} />
                </div>

                <div className="field-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                  {errors.dob && <span className="error-text">{errors.dob}</span>}
                </div>

                <div className="field-group full-width">
                  <label>Gender</label>
                  <div className="radio-group">
                    {['Male', 'Female', 'Other'].map((option) => (
                      <label key={option} className="radio-option">
                        <input type="radio" name="gender" value={option} checked={formData.gender === option} onChange={handleChange} />
                        {option}
                      </label>
                    ))}
                  </div>
                  {errors.gender && <span className="error-text">{errors.gender}</span>}
                </div>

                <div className="field-group full-width">
                  <label className="checkbox-label">
                    <input name="acceptTerms" type="checkbox" checked={formData.acceptTerms} onChange={handleChange} />
                    I accept the terms and conditions.
                  </label>
                  {errors.acceptTerms && <span className="error-text">{errors.acceptTerms}</span>}
                </div>
              </div>

              {successMessage && <div className="success-banner">{successMessage}</div>}

              <div className="form-actions">
                <Button label="Register" type="submit" variant="primary" />
                <Button label="Reset" type="button" variant="secondary" onClick={handleReset} />
              </div>
            </form>

            {submittedData && (
              <div className="summary-card">
                <h3>Submitted Details</h3>
                <p><strong>Name:</strong> {submittedData.fullName}</p>
                <p><strong>College:</strong> {submittedData.collegeName}</p>
                <p><strong>Email:</strong> {submittedData.email}</p>
                <p><strong>Branch:</strong> {submittedData.branch}</p>
                <p><strong>Resume:</strong> {submittedData.resume}</p>
              </div>
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Registration
