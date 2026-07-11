import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import Card from '../components/Card'
import StatsCard from '../components/StatsCard'
import Footer from '../components/Footer'
import '../App.css'

const navLinks = ['Home', 'Events', 'About', 'Login']
const sidebarItems = ['Dashboard', 'Upcoming Events', 'My Registrations', 'Announcements']
const stats = [
  { value: '24+', label: 'Events' },
  { value: '1.2K', label: 'Students' },
  { value: '95%', label: 'Attendance' },
]
const eventCards = [
  { title: 'Tech Fest', description: 'Explore innovation and creativity.', badge: 'Popular' },
  { title: 'Cultural Night', description: 'Enjoy music, dance and drama.', badge: 'New' },
  { title: 'Sports Meet', description: 'Compete and cheer with your team.', badge: 'Trending' },
]

function Home() {
  return (
    <div className="app-shell">
      <Navbar brand="College Events Registration" links={navLinks} />

      <div className="content-layout">
        <Sidebar items={sidebarItems} />

        <main className="main-content">
          <section className="hero-section">
            <div>
              <h1>Register for campus events easily</h1>
              <p>Discover upcoming activities and join the events you love.</p>
              <div className="hero-buttons">
                <Button label="Register Now" variant="primary" />
                <Button label="View Events" variant="secondary" />
              </div>
            </div>
          </section>

          <section className="stats-grid">
            {stats.map((item) => (
              <StatsCard key={item.label} value={item.value} label={item.label} />
            ))}
          </section>

          <section className="cards-grid">
            {eventCards.map((card) => (
              <Card key={card.title} title={card.title} description={card.description} badge={card.badge} />
            ))}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Home
