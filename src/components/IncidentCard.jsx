import { useElapsedTime } from '../hooks/useElapsedTime'
import StatusBadge from './StatusBadge'

export default function IncidentCard({ incident, isSelected, onClick }) {
  const elapsed = useElapsedTime(
    incident.status === 'opgelost' ? null : incident.aangemaakt
  )

  const displayElapsed = incident.status === 'opgelost'
    ? formatDuration(incident.opgelostOm - incident.aangemaakt)
    : elapsed

  return (
    <div
      className={`incident-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className={`incident-urgency-bar ${incident.urgentie}`} />
      <div className="incident-card-body">
        <div className="incident-card-header">
          <span className="incident-id">{incident.id}</span>
          <StatusBadge status={incident.urgentie} />
          {incident.status !== 'actief' && (
            <StatusBadge status={incident.status} />
          )}
        </div>
        <div className="incident-title">{incident.titel}</div>
        <div className="incident-card-meta">
          <span className="incident-location">{incident.adres}</span>
          <span>Scenario {incident.scenario}</span>
        </div>
      </div>
      <div className="incident-card-right">
        <span className="incident-elapsed">{displayElapsed}</span>
        <span className="incident-eta">ETA: {incident.eta}</span>
      </div>
    </div>
  )
}

function formatDuration(ms) {
  if (!ms) return '—'
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0')
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0')
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')
  return `${h}:${m}:${s}`
}
