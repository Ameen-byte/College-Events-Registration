<<<<<<< HEAD
import { NavLink, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import styles from './Dashboard.module.css'

const upcomingEvents = [
  { id: 1, title: 'Orientation Day', date: '2026-08-15' },
  { id: 2, title: 'Tech Fest', date: '2026-09-03' },
  { id: 3, title: 'Cultural Night', date: '2026-10-12' },
]

export default function Dashboard() {
  return (
    <div className={styles.dashboardPage}>
      <Sidebar />
      <section className={styles.content}>
        <div className={styles.topBar}>
          <h2>Dashboard</h2>
          <NavLink to="/register">Register New Student</NavLink>
        </div>
        <div className={styles.cards}>
          {upcomingEvents.map((event) => (
            <article key={event.id} className={styles.eventCard}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
            </article>
          ))}
        </div>
        <Outlet />
      </section>
    </div>
  )
}
=======
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import '../App.css'

const navLinks = ['Dashboard', 'Events', 'Profile']
const dashboardCards = [
  { title: 'Registered Events', description: 'You have 3 upcoming event registrations.', badge: 'Active' },
  { title: 'Club Updates', description: 'New announcements from student clubs today.', badge: 'Info' },
]

function Dashboard() {
  return (
    <div className="app-shell">
      <Navbar brand="Student Dashboard" links={navLinks} />
      <main className="main-content">
        <h2>Dashboard Page</h2>
        <div className="cards-grid">
          {dashboardCards.map((card) => (
            <Card key={card.title} title={card.title} description={card.description} badge={card.badge} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
>>>>>>> 3c0d9399f623008b350110f82fcc13138a690300
