import { useParams, Link } from 'react-router-dom'
import styles from './StudentDetails.module.css'

export default function StudentDetails({ students }) {
  const { id } = useParams()
  const student = students.find((item) => item.id.toString() === id)

  if (!student) {
    return (
      <section className={styles.detailsPage}>
        <div className={styles.card}>
          <h3>Record not found</h3>
          <Link to="/dashboard/overview">Back to Dashboard</Link>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.detailsPage}>
      <div className={styles.card}>
        <h2>{student.fullName}</h2>
        <ul>
          <li><strong>Email:</strong> {student.email}</li>
          <li><strong>Mobile:</strong> {student.mobile}</li>
          <li><strong>College:</strong> {student.college}</li>
          <li><strong>Branch:</strong> {student.branch}</li>
          <li><strong>Graduation Year:</strong> {student.graduationYear}</li>
          <li><strong>Skills:</strong> {student.skills || 'Not specified'}</li>
        </ul>
        <Link to="/dashboard/overview">Back to Overview</Link>
      </div>
    </section>
  )
}
