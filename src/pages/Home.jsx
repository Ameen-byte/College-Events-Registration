import Card from '../components/Card.jsx'
import HeroCard from '../components/HeroCard.jsx'
import styles from './Home.module.css'

const stats = [
  { title: 'Events', value: '12' },
  { title: 'Registrations', value: '480' },
  { title: 'Colleges', value: '16' },
]

export default function Home() {
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
    </div>
  )
}
