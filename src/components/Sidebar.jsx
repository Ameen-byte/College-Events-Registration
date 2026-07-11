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
