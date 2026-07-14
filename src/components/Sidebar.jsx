<<<<<<< HEAD
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const items = [
  { label: 'Overview', path: '/dashboard/overview' },
  { label: 'Profile', path: '/dashboard/profile' },
  { label: 'Settings', path: '/dashboard/settings' },
 
]

export default function Sidebar() {
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
      </div>
    </aside>
  )
}
=======
import '../styles/Sidebar.css'

function Sidebar({ items }) {
  return (
    <aside className="sidebar">
      <h3>Quick Access</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
>>>>>>> 3c0d9399f623008b350110f82fcc13138a690300
