import styles from './Profile.module.css'

export default function Profile({ currentUser }) {
  if (!currentUser) {
    return (
      <div className={styles.profilePage}>
        <p>Please log in to see your profile information.</p>
        
      </div>
    )
  }

  return (
    <section className={styles.profilePage}>
      <h3>Profile Info</h3>
      <dl>
        <dt>Full Name</dt>
        <dd>{currentUser.fullName}</dd>
        <dt>Email</dt>
        <dd>{currentUser.email}</dd>
        <dt>College</dt>
        <dd>{currentUser.college}</dd>
        <dt>Branch</dt>
        <dd>{currentUser.branch}</dd>
      </dl>
    </section>
  )
}
