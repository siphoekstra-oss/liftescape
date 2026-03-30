export default function StatusBadge({ status }) {
  const className = status
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[ë]/g, 'e')

  return (
    <span className={`status-badge ${className}`}>
      {status}
    </span>
  )
}
