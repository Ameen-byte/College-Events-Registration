import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.notFoundPage}>
      <div className={styles.card}>
        <h2>404 - Page Not Found</h2>
        <p>The path you requested could not be found. Please return to the home page and try again.</p>
        <Link to="/">Return to Home</Link>
      </div>
    </section>
  )
}
