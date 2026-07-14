<<<<<<< HEAD
import styles from './Button.module.css'

export default function Button({ children, type = 'button', onClick, disabled }) {
  return (
    <button className={styles.button} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
=======
import '../styles/Button.css'

function Button({ label, type = 'button', variant = 'primary', onClick }) {
  return (
    <button className={`btn ${variant}`} type={type} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
>>>>>>> 3c0d9399f623008b350110f82fcc13138a690300
