import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import { createRegistration, getEvents } from '../api/api.js'
import styles from './Events.module.css'

const initialRegistration = {
  event: '',
  fullName: '',
  email: '',
  mobile: '',
  college: '',
  branch: '',
  graduationYear: '',
  paymentMethod: 'upi',
}

export default function Events({ currentUser }) {
  const [events, setEvents] = useState([])
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 })
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('startsAt')
  const [order, setOrder] = useState('asc')
  const [selectedEventId, setSelectedEventId] = useState('')
  const [registration, setRegistration] = useState(() => ({ ...initialRegistration, ...currentUser }))
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    getEvents({ status: 'open', search: query, page: meta.page, limit: 6, sort, order })
      .then(({ data }) => { if (active) { setEvents(data.data); setMeta({ page: data.page, pages: Math.max(data.pages, 1), total: data.total }) } })
      .catch(() => active && setError('Unable to load events. Check that the backend is running.'))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [query, sort, order, meta.page])

  const colleges = useMemo(() => {
    return events.reduce((groups, event) => {
      const college = event.hostCollege || 'College Events'
      const current = groups.find((group) => group.name === college)
      if (current) current.events.push(event)
      else groups.push({ name: college, city: event.city || 'Campus', events: [event] })
      return groups
    }, [])
  }, [events])

  const selectedEvent = events.find((event) => event._id === selectedEventId)

  const selectEvent = (event) => {
    setSelectedEventId(event._id)
    setRegistration((current) => ({ ...current, event: event._id }))
    setMessage('')
    setError('')
  }

  const handleChange = (event) => {
    setRegistration((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    setSubmitting(true)

    try {
      const payload = { ...registration, event: selectedEventId, graduationYear: Number(registration.graduationYear) }
      const { data } = await createRegistration(payload)
      setMessage(`${data.message}. ${selectedEvent.title} is now in your registered details.`)
      setRegistration((current) => ({ ...initialRegistration, fullName: current.fullName, email: current.email, college: current.college, branch: current.branch, graduationYear: current.graduationYear }))
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to complete registration.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className={styles.eventsPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Campus directory</p>
          <h1>Events</h1>
          <p>Explore colleges, choose an event, and complete your registration in one place.</p>
        </div>
        <span className={styles.eventCount}>{events.length} open events</span>
      </header>

      <div className={styles.toolbar}>
        <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setMeta((current) => ({ ...current, page: 1 })) }} placeholder="Search events, categories, colleges..." />
        <select value={sort} onChange={(event) => { setSort(event.target.value); setMeta((current) => ({ ...current, page: 1 })) }}><option value="startsAt">Date</option><option value="title">Name</option><option value="category">Category</option><option value="registrationFee">Price</option></select>
        <button type="button" onClick={() => setOrder((current) => current === 'asc' ? 'desc' : 'asc')}>Order: {order}</button>
      </div>

      {loading && <div className={styles.status}>Loading colleges and events...</div>}
      {error && !selectedEvent && <div className={styles.error}>{error}</div>}

      <div className={styles.collegeList}>
        {colleges.map((college) => (
          <section className={styles.collegeSection} key={college.name}>
            <div className={styles.collegeHeader}>
              <div><h2>{college.name}</h2><p>{college.city} · {college.events.length} events</p></div>
            </div>
            <div className={styles.eventGrid}>
              {college.events.map((event) => (
                <article className={`${styles.eventCard} ${selectedEventId === event._id ? styles.activeEvent : ''}`} key={event._id}>
                  <div className={styles.eventCategory}>{event.category}</div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <dl><div><dt>Venue</dt><dd>{event.venue}</dd></div><div><dt>Date</dt><dd>{new Date(event.startsAt).toLocaleDateString()}</dd></div></dl>
                  <div className={styles.priceLine}><span>Student <strong>₹{event.studentDiscountFee}</strong></span><del>₹{event.registrationFee}</del></div>
                  <div className={styles.cardActions}><Link to={`/details/${event._id}`}>View details</Link><button type="button" onClick={() => selectEvent(event)}>Register</button></div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedEvent && (
        <section className={styles.registrationPanel}>
          <div className={styles.registrationHeader}><div><p className={styles.eyebrow}>Registration form</p><h2>{selectedEvent.title}</h2><p>{selectedEvent.hostCollege} · Student price ₹{selectedEvent.studentDiscountFee}</p></div><button type="button" className={styles.closeButton} onClick={() => setSelectedEventId('')}>Close</button></div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Full name<input name="fullName" value={registration.fullName} onChange={handleChange} required /></label>
            <label>Email<input name="email" type="email" value={registration.email} onChange={handleChange} required /></label>
            <label>Mobile<input name="mobile" pattern="[0-9]{10}" value={registration.mobile} onChange={handleChange} required /></label>
            <label>College<input name="college" value={registration.college} onChange={handleChange} required /></label>
            <label>Branch<input name="branch" value={registration.branch} onChange={handleChange} required /></label>
            <label>Graduation year<input name="graduationYear" type="number" min="2020" max="2100" value={registration.graduationYear} onChange={handleChange} required /></label>
            <label>Payment method<select name="paymentMethod" value={registration.paymentMethod} onChange={handleChange}><option value="upi">UPI</option><option value="card">Debit / Credit card</option><option value="netbanking">Net banking</option><option value="cash">Pay at campus counter</option></select></label>
            <div className={styles.formAction}><Button type="submit" disabled={submitting}>{submitting ? 'Processing...' : `Pay ₹${selectedEvent.studentDiscountFee} and register`}</Button></div>
          </form>
          {message && <p className={styles.success}>{message}</p>}{error && <p className={styles.error}>{error}</p>}
        </section>
      )}
      {!loading && !error && meta.pages > 1 && <div className={styles.pagination}><button type="button" disabled={meta.page <= 1} onClick={() => setMeta((current) => ({ ...current, page: current.page - 1 }))}>Previous</button><span>Page {meta.page} of {meta.pages}</span><button type="button" disabled={meta.page >= meta.pages} onClick={() => setMeta((current) => ({ ...current, page: current.page + 1 }))}>Next</button></div>}
    </section>
  )
}
