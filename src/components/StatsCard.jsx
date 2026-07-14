import '../styles/StatsCard.css'

function StatsCard({ value, label }) {
  return (
    <div className="stats-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

export default StatsCard
