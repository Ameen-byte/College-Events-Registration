import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './StudentDetails.module.css'

export default function EventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchEvent = async () => {
      try {
        setLoading(true)
        setError('')
        

        if (!response.ok) {
          throw new Error('Unable to load event details.')
        }

        const data = await response.json()
        if (isMounted) {
          setEvent(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchEvent()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return (
      <section className={styles.detailsPage}>
        <div className={styles.card}>
          <h2>Loading event details…</h2>
          <p>Please wait while we fetch the latest information.</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.detailsPage}>
        <div className={styles.card}>
          <h2>Unable to load details</h2>
          <p>{error}</p>
          <Link to="/">Back to Home</Link>
        </div>
      </section>
    )
  }

  if (!event) {
    return (
      <section className={styles.detailsPage}>
        <div className={styles.card}>
          <h2>Record not found</h2>
          <p>The requested event could not be found.</p>
          <Link to="/">View all events</Link>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.detailsPage}>
      <div className={styles.card}>
        <h2>{event.title}</h2>
        <p>{event.body}</p>
        <ul>
          <li><strong>Event ID:</strong> {event.id}</li>
          <li><strong>Post ID:</strong> {event.id}</li>
          <li><strong>Category:</strong> API post</li>
          <li><strong>Status:</strong> Available</li>
        </ul>
        <Link to="/">Back to Home</Link>
      </div>
    </section>
  )
}
