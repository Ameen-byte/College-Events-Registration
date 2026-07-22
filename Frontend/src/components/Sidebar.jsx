import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const items = [
  { label: 'Events', path: '/dashboard' },
  { label: 'Overview', path: '/dashboard/overview' },
  { label: 'Profile', path: '/dashboard/profile' },
  { label: 'Settings', path: '/dashboard/settings' },
]

export default function Sidebar({ onLogout }) {
  return (
    <aside className={styles.sidebar}>
      <h3>Dashboard</h3>
      <div className={styles.links}>
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <button type="button" className={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  )
}
