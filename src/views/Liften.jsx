import { useState, useMemo } from 'react'
import { liften } from '../data/liften'
import StatusBadge from '../components/StatusBadge'

export default function Liften() {
  const [zoek, setZoek] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const types = [...new Set(liften.map(l => l.type))].sort()

  const filtered = useMemo(() => {
    return liften.filter(l => {
      if (zoek && !l.gebouw.toLowerCase().includes(zoek.toLowerCase()) && !l.adres.toLowerCase().includes(zoek.toLowerCase()) && !l.stad.toLowerCase().includes(zoek.toLowerCase())) return false
      if (typeFilter && l.type !== typeFilter) return false
      if (statusFilter && l.monitoringstatus !== statusFilter) return false
      return true
    })
  }, [zoek, typeFilter, statusFilter])

  return (
    <div>
      <div className="view-header">
        <h1 className="view-title">Liftregister</h1>
        <p className="view-subtitle">Overzicht van alle geregistreerde liften in het Liftescape-netwerk</p>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Zoeken</span>
        <input
          type="text"
          placeholder="Gebouw, adres of stad..."
          value={zoek}
          onChange={e => setZoek(e.target.value)}
        />
        <span className="filter-label">Type</span>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">Alle types</option>
          {types.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>
        <span className="filter-label">Status</span>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Alle statussen</option>
          <option value="online">Online</option>
          <option value="storing">Storing</option>
          <option value="alarm">Alarm</option>
        </select>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Lift ID</th>
              <th>Gebouw</th>
              <th>Adres</th>
              <th>Type</th>
              <th>Fabrikant</th>
              <th>Noodtelefoon</th>
              <th>Laatste keuring</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className={l.noodtelefoon === 'Defect' ? 'alert-row' : ''}>
                <td>{l.id}</td>
                <td style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{l.gebouw}</td>
                <td>{l.adres}, {l.stad}</td>
                <td>{l.type.charAt(0).toUpperCase() + l.type.slice(1)}</td>
                <td>{l.fabrikant}</td>
                <td>
                  {l.noodtelefoon === 'Defect'
                    ? <StatusBadge status="defect" />
                    : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{l.noodtelefoon}</span>
                  }
                </td>
                <td>{new Date(l.laatsteKeuring).toLocaleDateString('nl-NL')}</td>
                <td><StatusBadge status={l.monitoringstatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
