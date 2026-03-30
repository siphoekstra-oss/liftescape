import { useState, useMemo } from 'react'
import { bevrijders } from '../data/bevrijders'
import StatusBadge from '../components/StatusBadge'

export default function Bevrijders() {
  const [zoek, setZoek] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [regioFilter, setRegioFilter] = useState('')
  const [selectedBevrijder, setSelectedBevrijder] = useState(null)

  const regios = [...new Set(bevrijders.map(b => b.regio))].sort()

  const filtered = useMemo(() => {
    return bevrijders.filter(b => {
      if (zoek && !b.naam.toLowerCase().includes(zoek.toLowerCase()) && !b.stad.toLowerCase().includes(zoek.toLowerCase())) return false
      if (statusFilter && b.status !== statusFilter) return false
      if (regioFilter && b.regio !== regioFilter) return false
      return true
    })
  }, [zoek, statusFilter, regioFilter])

  return (
    <div>
      <div className="view-header">
        <h1 className="view-title">Bevrijdersnetwerk</h1>
        <p className="view-subtitle">Overzicht van alle gecertificeerde bevrijders in het Liftescape-netwerk</p>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Zoeken</span>
        <input
          type="text"
          placeholder="Naam of stad..."
          value={zoek}
          onChange={e => setZoek(e.target.value)}
        />
        <span className="filter-label">Status</span>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Alle statussen</option>
          <option value="beschikbaar">Beschikbaar</option>
          <option value="onderweg">Onderweg</option>
          <option value="offline">Offline</option>
        </select>
        <span className="filter-label">Regio</span>
        <select value={regioFilter} onChange={e => setRegioFilter(e.target.value)}>
          <option value="">Alle regio's</option>
          {regios.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Naam</th>
              <th>Bedrijf</th>
              <th>Regio</th>
              <th>Certificering</th>
              <th>Status</th>
              <th>Gem. responstijd</th>
              <th>Bevrijdingen</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="clickable" onClick={() => setSelectedBevrijder(b)}>
                <td>{b.id}</td>
                <td style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{b.naam}</td>
                <td>{b.bedrijf}</td>
                <td>{b.stad}, {b.regio}</td>
                <td>{b.certificering}</td>
                <td><StatusBadge status={b.status} /></td>
                <td>{b.gemResponstijd} min</td>
                <td>{b.aantalBevrijdingen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBevrijder && (
        <div className="modal-backdrop" onClick={() => setSelectedBevrijder(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedBevrijder.naam}</h2>
              <button className="modal-close" onClick={() => setSelectedBevrijder(null)}>✕</button>
            </div>
            <div className="detail-info-grid" style={{ marginBottom: 16 }}>
              <div className="detail-info-item">
                <label>Certificering</label>
                <span>{selectedBevrijder.certificering}</span>
              </div>
              <div className="detail-info-item">
                <label>Geldig tot</label>
                <span>{new Date(selectedBevrijder.geldigTot).toLocaleDateString('nl-NL')}</span>
              </div>
              <div className="detail-info-item">
                <label>Bedrijf</label>
                <span>{selectedBevrijder.bedrijf}</span>
              </div>
              <div className="detail-info-item">
                <label>Status</label>
                <span><StatusBadge status={selectedBevrijder.status} /></span>
              </div>
              <div className="detail-info-item">
                <label>Locatie</label>
                <span>{selectedBevrijder.stad}, {selectedBevrijder.regio}</span>
              </div>
              <div className="detail-info-item">
                <label>Telefoon</label>
                <span>{selectedBevrijder.telefoon}</span>
              </div>
              <div className="detail-info-item">
                <label>Totaal bevrijdingen</label>
                <span>{selectedBevrijder.aantalBevrijdingen}</span>
              </div>
              <div className="detail-info-item">
                <label>Gem. responstijd</label>
                <span>{selectedBevrijder.gemResponstijd} min</span>
              </div>
            </div>
            <div className="detail-info-item">
              <label>Laatste activiteit</label>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                {new Date(selectedBevrijder.laatsteActiviteit).toLocaleString('nl-NL')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
