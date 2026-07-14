<<<<<<< HEAD
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Register', path: '/register' },
  { label: 'Login', path: '/login' },
  { label: 'Dashboard', path: '/dashboard' },
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
=======
import '../styles/Navbar.css'

function Navbar({ brand, links }) {
  return (
    <header className="navbar">
      <div className="brand">{brand}</div>
      <nav>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link}>{link}</li>
          ))}
        </ul>
>>>>>>> 3c0d9399f623008b350110f82fcc13138a690300
      </nav>
    </header>
  )
}
<<<<<<< HEAD
=======

export default Navbar
>>>>>>> 3c0d9399f623008b350110f82fcc13138a690300
