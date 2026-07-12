import '../styles/Button.css'

function Button({ label, type = 'button', variant = 'primary', onClick }) {
  return (
    <button className={`btn ${variant}`} type={type} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
