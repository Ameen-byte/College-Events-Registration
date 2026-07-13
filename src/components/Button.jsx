import styles from './Button.module.css'

export default function Button({ children, type = 'button', onClick, disabled }) {
  return (
    <button className={styles.button} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
