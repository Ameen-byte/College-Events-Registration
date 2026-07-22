import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Register", path: "/register" },
  { label: "Login", path: "/login" },
];

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <img
          src={logo}
          alt="EduTrack Logo"
          className={styles.logo}
        />
        <h2 className={styles.brand}>College Events Registration</h2>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.menu}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button className={styles.logoutBtn}>
        Logout
      </button>
    </header>
  );
}