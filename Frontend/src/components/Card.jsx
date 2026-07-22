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
