import '../styles/Card.css'

function Card({ title, description, badge }) {
  return (
    <article className="card">
      <span className="badge">{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default Card
