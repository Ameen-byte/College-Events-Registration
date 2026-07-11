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
      </nav>
    </header>
  )
}

export default Navbar
