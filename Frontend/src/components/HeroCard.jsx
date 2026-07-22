import styles from './HeroCard.module.css'

export default function HeroCard({ title, description, highlighted }) {
  return (
    <section className={styles.heroCard}>
      <h2>{title}</h2>
      <p>{description}</p>
      {highlighted && <span className={styles.badge}>New</span>}
    </section>
  )
}
