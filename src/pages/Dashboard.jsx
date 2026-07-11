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
