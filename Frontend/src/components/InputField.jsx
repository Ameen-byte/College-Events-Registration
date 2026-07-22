import styles from './InputField.module.css'

export default function InputField({ label, type = 'text', name, value, onChange, error, placeholder }) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? styles.invalid : ''}
      />
      {error && <small className={styles.error}>{error}</small>}
    </div>
  )
}
