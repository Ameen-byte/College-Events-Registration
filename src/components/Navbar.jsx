import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Register', path: '/register' },
  { label: 'Login', path: '/login' },
]

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>College Events Registration</div>
      <nav className={styles.menu}>
        {navItems.map((item) => (
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
      </nav>
    </header>
  )
}
