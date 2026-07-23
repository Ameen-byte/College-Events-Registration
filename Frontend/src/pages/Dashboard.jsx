import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import styles from './Dashboard.module.css'

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.dashboardPage}>
      <Sidebar onLogout={handleLogout} />
      <section className={styles.content}>
        <div className={styles.topBar}>
          <div>
            <h2>Dashboard</h2>
            <p className={styles.subText}>Manage your events account and registrations.</p>
          </div>
        </div>
        <Outlet />
      </section>
    </div>
  )
}
