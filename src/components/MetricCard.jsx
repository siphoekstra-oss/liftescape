export default function MetricCard({ label, value, color = 'default', sub }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className={`metric-value ${color}`}>{value}</div>
      {sub && <div className="metric-sub">{sub}</div>}
    </div>
  )
}
