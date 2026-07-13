import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import styles from './Overview.module.css'

export default function Overview({ students }) {
  const [search, setSearch] = useState('')

  const filteredStudents = useMemo(() => {
    const term = search.toLowerCase()
    return students.filter((student) =>
      [student.fullName, student.email, student.college]
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [search, students])

  return (
    <section className={styles.overviewPage}>
      <div className={styles.searchBar}>
        <label htmlFor="search">Search Students</label>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, or college"
        />
      </div>
      {filteredStudents.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No student records found.</h3>
          <p>Register a student to display cards and table rows.</p>
        </div>
      ) : (
        <>
          <div className={styles.cardGrid}>
            {filteredStudents.map((student) => (
              <Card key={student.id} title={student.fullName} value={student.branch}>
                <p>{student.email}</p>
                <p>{student.college}</p>
                <Link to={`/dashboard/student/${student.id}`} className={styles.detailsLink}>
                  View details
                </Link>
              </Card>
            ))}
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>College</th>
                  <th>Branch</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>{student.college}</td>
                    <td>{student.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}
