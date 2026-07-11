import '../styles/Button.css'

function Button({ label, type = 'button', variant = 'primary' }) {
  return (
    <button className={`btn ${variant}`} type={type}>
      {label}
    </button>
  )
}

export default Button
