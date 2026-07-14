import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import HeroCard from '../components/HeroCard.jsx'
import styles from './Home.module.css'
import Sidebar from '../components/Sidebar.jsx'

const stats = [
  { title: 'Events', value: '12' },
  { title: 'Registrations', value: '480' },
  { title: 'Colleges', value: '16' },
]

export default function Home() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('title')

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')

      if (!response.ok) {
        throw new Error('Failed to fetch events.')
      }

      const data = await response.json()
      setEvents(data)
    } catch (err) {
      setError(err.message || 'Something went wrong while loading events.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const nextEvents = [...events].filter((event) => {
      if (!term) return true
      return `${event.title} ${event.body}`.toLowerCase().includes(term)
    })

    return nextEvents.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }

      if (sortBy === 'id') {
        return a.id - b.id
      }

      return a.body.localeCompare(b.body)
    })
  }, [events, searchTerm, sortBy])

  return (
    <div className={styles.homePage}>
      <HeroCard
        title="Welcome to College Events Registration"
        description="Register for campus events, manage attendees, and track event details from one dashboard."
        highlighted
      />

      <div className={styles.grid}>
        {stats.map((stat) => (
          <Card key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <section className={styles.eventsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>Upcoming Events</h3>
            <p>Browse featured event details with dynamic routing and live data.</p>
          </div>
          <button type="button" className={styles.refreshButton} onClick={fetchEvents}>
            Refresh data
          </button>
        </div>

        <div className={styles.controls}>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Filter by title or description"
          />
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="title">Sort by title</option>
            <option value="id">Sort by ID</option>
            <option value="body">Sort by description</option>
          </select>
        </div>

        {loading ? (
          <div className={styles.statusCard}>Loading events…</div>
        ) : error ? (
          <div className={styles.statusCard}>{error}</div>
        ) : (
          <div className={styles.eventGrid}>
            {filteredEvents.map((event) => (
              <article key={event.id} className={styles.eventCard}>
                <h4>{event.title}</h4>
                <p>{event.body}</p>
                <div className={styles.actions}>
                  <Link to={`/details/${event.id}`} className={styles.viewLink}>
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}