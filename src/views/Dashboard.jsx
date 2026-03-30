import { useState, useMemo } from 'react'
import MetricCard from '../components/MetricCard'
import IncidentCard from '../components/IncidentCard'
import DetailPanel from '../components/DetailPanel'
import { bevrijders } from '../data/bevrijders'

const urgentieOrder = { kritisch: 0, verhoogd: 1, hoog: 1, standaard: 2 }

export default function Dashboard({ incidents, dispatch }) {
  const [selectedId, setSelectedId] = useState(null)

  const selectedIncident = incidents.find(i => i.id === selectedId)

  const actief = incidents.filter(i => i.status === 'actief')
  const opgelost = incidents.filter(i => i.status === 'opgelost')
  const geescaleerd = incidents.filter(i => i.status === 'geescaleerd')

  const sorted = useMemo(() => {
    return [...incidents].sort((a, b) => {
      const statusOrder = { actief: 0, geescaleerd: 1, opgelost: 2 }
      const sDiff = (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9)
      if (sDiff !== 0) return sDiff
      return (urgentieOrder[a.urgentie] ?? 9) - (urgentieOrder[b.urgentie] ?? 9)
    })
  }, [incidents])

  const beschikbareBevrijders = bevrijders.filter(b => b.status === 'beschikbaar').length

  const gemResponstijd = useMemo(() => {
    if (opgelost.length === 0) return '—'
    const avg = opgelost.reduce((sum, i) => sum + (i.opgelostOm - i.aangemaakt), 0) / opgelost.length
    return `${Math.round(avg / 60000)} min`
  }, [opgelost])

  function handleResolve(id) {
    dispatch({ type: 'RESOLVE', id })
  }

  function handleEscalate(id) {
    dispatch({ type: 'ESCALATE', id })
  }

  return (
    <div className="dashboard">
      <div className="metrics-row">
        <MetricCard
          label="Actieve incidenten"
          value={actief.length}
          color={actief.length > 0 ? 'critical' : 'default'}
          sub="meldingen in behandeling"
        />
        <MetricCard
          label="Gem. responstijd"
          value={gemResponstijd}
          color="warning"
          sub="vandaag opgelost"
        />
        <MetricCard
          label="Opgelost vandaag"
          value={opgelost.length}
          color="ok"
          sub="succesvol afgerond"
        />
        <MetricCard
          label="Bevrijders beschikbaar"
          value={`${beschikbareBevrijders} / ${bevrijders.length}`}
          color="gold"
          sub="gecertificeerd BRL K10006"
        />
      </div>

      <div className={`dashboard-main ${selectedIncident ? '' : 'no-detail'}`}>
        <div className="incident-list-container">
          {sorted.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">—</div>
              <div className="empty-state-text">Geen actieve incidenten</div>
              <div className="empty-state-sub">Gebruik de scenario-knoppen in de sidebar om een testmelding toe te voegen</div>
            </div>
          ) : (
            <div className="incident-list">
              {sorted.map(incident => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  isSelected={incident.id === selectedId}
                  onClick={() => setSelectedId(incident.id === selectedId ? null : incident.id)}
                />
              ))}
            </div>
          )}
        </div>

        {selectedIncident && (
          <DetailPanel
            incident={selectedIncident}
            onClose={() => setSelectedId(null)}
            onResolve={handleResolve}
            onEscalate={handleEscalate}
          />
        )}
      </div>
    </div>
  )
}
