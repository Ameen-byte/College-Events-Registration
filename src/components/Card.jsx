<<<<<<< HEAD
import styles from './Card.module.css'

export default function Card({ title, value, children }) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
      {children}
    </article>
  )
}
=======
import '../styles/Card.css'

function Card({ title, description, badge }) {
  return (
    <article className="card">
      <span className="badge">{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default Card
>>>>>>> 3c0d9399f623008b350110f82fcc13138a690300
