import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRegistration } from '../api/api.js'
import styles from './StudentDetails.module.css'

export default function StudentDetails() {
  const { id } = useParams()
  const [registration, setRegistration] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getRegistration(id)
      .then(({ data }) => setRegistration(data.data))
      .catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load registration.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <section className={styles.detailsPage}><div className={styles.card}><h2>Loading registration...</h2></div></section>
  if (error) return <section className={styles.detailsPage}><div className={styles.card}><h2>Unable to load registration</h2><p>{error}</p><Link to="/dashboard/overview">Back to overview</Link></div></section>
  return <section className={styles.detailsPage}><div className={styles.card}><h2>{registration.fullName}</h2><p>{registration.email}</p><ul><li><strong>Event:</strong> {registration.event?.title}</li><li><strong>College:</strong> {registration.college}</li><li><strong>Branch:</strong> {registration.branch}</li><li><strong>Payment:</strong> ₹{registration.paymentAmount} ({registration.paymentStatus})</li><li><strong>Status:</strong> {registration.status}</li></ul><Link to="/dashboard/overview">Back to overview</Link></div></section>
}
