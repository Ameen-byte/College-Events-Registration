import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.notFoundPage}>
      <div className={styles.card}>
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Return to Home</Link>
      </div>
    </section>
  )
}
