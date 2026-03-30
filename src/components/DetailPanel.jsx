import { useElapsedTime } from '../hooks/useElapsedTime'
import StatusBadge from './StatusBadge'
import Timeline from './Timeline'
import ResponderCard from './ResponderCard'

export default function DetailPanel({ incident, onClose, onResolve, onEscalate }) {
  const elapsed = useElapsedTime(
    incident.status === 'opgelost' ? null : incident.aangemaakt
  )

  if (!incident) return null

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div className="detail-header-top">
          <span className="detail-id">{incident.id}</span>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>
        <div className="detail-address">{incident.gebouw}</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, fontFamily: 'var(--font-body)' }}>
          {incident.adres}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <StatusBadge status={incident.urgentie} />
          {incident.status !== 'actief' && <StatusBadge status={incident.status} />}
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">Incidentgegevens</div>
        <div className="detail-info-grid">
          <div className="detail-info-item">
            <label>Oorzaak</label>
            <span>{incident.oorzaak}</span>
          </div>
          <div className="detail-info-item">
            <label>Passagier</label>
            <span>{incident.passagierStatus}</span>
          </div>
          <div className="detail-info-item">
            <label>Scenario</label>
            <span>Type {incident.scenario}</span>
          </div>
          <div className="detail-info-item">
            <label>Communicatie</label>
            <span>{incident.communicatie ? 'Actief' : 'Geen contact'}</span>
          </div>
          <div className="detail-info-item">
            <label>Verstreken tijd</label>
            <span>{elapsed}</span>
          </div>
          <div className="detail-info-item">
            <label>Context</label>
            <span>{incident.context}</span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">Toegewezen bevrijder</div>
        <ResponderCard
          naam={incident.bevrijderNaam}
          bedrijf={incident.bevrijderBedrijf}
          certificering={incident.bevrijderCertificering}
          afstand={incident.bevrijderAfstand}
          eta={incident.bevrijderEta}
        />
      </div>

      <div className="detail-section" style={{ flex: 1 }}>
        <div className="detail-section-title">Proceslog</div>
        <Timeline entries={incident.tijdlijn} />
      </div>

      {incident.status === 'actief' && (
        <div className="detail-actions">
          <button className="btn btn-primary" onClick={() => onResolve(incident.id)}>
            Markeer als opgelost
          </button>
          <button className="btn btn-danger" onClick={() => onEscalate(incident.id)}>
            Escaleer naar 112
          </button>
        </div>
      )}
    </div>
  )
}
