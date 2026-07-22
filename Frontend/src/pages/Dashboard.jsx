import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Button from '../components/Button.jsx'
import styles from './Dashboard.module.css'

// import dashboardBg from "../assets/dashboard-bg.jpg";

const colleges = [
  {
    id: 1,
    name: 'Chalapathi Institute of Technology',
    city: 'Guntur',
    events: [
      { id: 101, title: 'Innovation Hackathon', date: '2026-08-18', venue: 'Main Auditorium', category: 'Coding' },
      { id: 102, title: 'AI & Robotics Expo', date: '2026-09-02', venue: 'Tech Block', category: 'Technology' },
    ],
  },
  {
    id: 2,
    name: 'PSG Arts and Science College',
    city: 'Coimbatore',
    events: [
      { id: 201, title: 'Cultural Fest', date: '2026-08-24', venue: 'Open Air Stage', category: 'Arts' },
      { id: 202, title: 'Music Night', date: '2026-10-05', venue: 'Performing Arts Hall', category: 'Music' },
    ],
  },
  {
    id: 3,
    name: 'Sri Krishna Polytechnic',
    city: 'Vijayawada',
    events: [
      { id: 301, title: 'Technical Quiz Meet', date: '2026-09-14', venue: 'Seminar Hall', category: 'Quiz' },
      { id: 302, title: 'Skill Development Workshop', date: '2026-10-12', venue: 'Workshop Lab', category: 'Training' },
    ],
  },
]

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
}

const loadStoredRegistrations = () => {
  if (typeof window === 'undefined') return []

  try {
    const saved = window.localStorage.getItem('eventRegistrations')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function Dashboard({ setCurrentUser, setIsAuthenticated }) {
  const navigate = useNavigate()
  const [selectedCollegeId, setSelectedCollegeId] = useState(colleges[0].id)
  const [selectedEventId, setSelectedEventId] = useState(colleges[0].events[0].id)
  const [registrations, setRegistrations] = useState(loadStoredRegistrations)
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('eventRegistrations', JSON.stringify(registrations))
    }
  }, [registrations])

  useEffect(() => {
    const activeCollege = colleges.find((college) => college.id === selectedCollegeId)
    if (!activeCollege) return

    if (!activeCollege.events.some((event) => event.id === selectedEventId)) {
      setSelectedEventId(activeCollege.events[0]?.id)
    }
  }, [selectedCollegeId, selectedEventId])

  const selectedCollege = colleges.find((college) => college.id === selectedCollegeId)
  const selectedEvent = selectedCollege?.events.find((event) => event.id === selectedEventId)

  const handleCollegeSelect = (collegeId) => {
    setSelectedCollegeId(collegeId)
  }

  const handleEventSelect = (eventId) => {
    setSelectedEventId(eventId)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!selectedEvent) return

    const registration = {
      id: Date.now(),
      collegeName: selectedCollege.name,
      eventTitle: selectedEvent.title,
      ...form,
      registeredAt: new Date().toLocaleString(),
    }

    setRegistrations((prev) => [registration, ...prev])
    setForm(initialForm)
    setMessage(`You are registered for ${selectedEvent.title}.`)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    navigate('/login', { replace: true })
  }

  return (
    
    <div className={styles.dashboardPage}>
      <Sidebar onLogout={handleLogout} />
      <section className={styles.content}>
        <div className={styles.topBar}>
          <div>
            <h2>Dashboard</h2>
            <p className={styles.subText}>Pick a local college and register for its upcoming event.</p>
          </div>
        </div>

        <div className={styles.heroCard}>
          <div>
            <h3>College events near you</h3>
            <p>Explore live campus events hosted by local colleges and register instantly.</p>
          </div>
        </div>

        <div className={styles.collegeGrid}>
          {colleges.map((college) => (
            <button
              key={college.id}
              type="button"
              onClick={() => handleCollegeSelect(college.id)}
              className={`${styles.collegeCard} ${selectedCollegeId === college.id ? styles.activeCollege : ''}`}
            >
              <h4>{college.name}</h4>
              <p>{college.city}</p>
              <span>{college.events.length} events</span>
            </button>
          ))}
        </div>

        {selectedCollege && (
          <div className={styles.eventSection}>
            <div className={styles.sectionHeader}>
              <h3>{selectedCollege.name} events</h3>
              <p>{selectedCollege.city}</p>
            </div>

            <div className={styles.eventGrid}>
              {selectedCollege.events.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => handleEventSelect(event.id)}
                  className={`${styles.eventCard} ${selectedEventId === event.id ? styles.activeEvent : ''}`}
                >
                  <h4>{event.title}</h4>
                  <p>{event.date}</p>
                  <span>{event.venue}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedEvent && (
          <div className={styles.registrationPanel}>
            <div className={styles.registrationHeader}>
              <div>
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.date} • {selectedEvent.venue}</p>
              </div>
              <span className={styles.badge}>{selectedEvent.category}</span>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <label>
                  Full name
                  <input name="fullName" value={form.fullName} onChange={handleChange} required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </label>
              </div>

              <div className={styles.formRow}>
                <label>
                  Phone
                  <input name="phone" value={form.phone} onChange={handleChange} required />
                </label>
                <label>
                  Department
                  <input name="department" value={form.department} onChange={handleChange} required />
                </label>
              </div>

              <Button type="submit">Register for this event</Button>
              {message && <p className={styles.success}>{message}</p>}
            </form>
          </div>
        )}

        <div className={styles.registrationList}>
          <h3>Recent registrations</h3>
          {registrations.length === 0 ? (
            <p>No registrations yet.</p>
          ) : (
            <ul>
              {registrations.map((item) => (
                <li key={item.id}>
                  <strong>{item.fullName}</strong> registered for <strong>{item.eventTitle}</strong> at {item.collegeName} on {item.registeredAt}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Outlet />
      </section>
    </div>
  )
}
