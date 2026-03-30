import { useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import Dashboard from './views/Dashboard'
import Bevrijders from './views/Bevrijders'
import Liften from './views/Liften'
import Rapportage from './views/Rapportage'
import { createIncident } from './data/incidents'

function incidentReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const incident = createIncident(action.scenario)
      if (!incident) return state
      return [incident, ...state]
    }
    case 'RESOLVE': {
      const now = Date.now()
      return state.map(i =>
        i.id === action.id
          ? {
              ...i,
              status: 'opgelost',
              opgelostOm: now,
              tijdlijn: [
                ...i.tijdlijn,
                {
                  tijd: now,
                  actie: 'Incident opgelost',
                  detail: 'Passagier succesvol bevrijd — incident afgesloten',
                  type: 'ok',
                },
              ],
            }
          : i
      )
    }
    case 'ESCALATE': {
      const now = Date.now()
      return state.map(i =>
        i.id === action.id
          ? {
              ...i,
              status: 'geescaleerd',
              tijdlijn: [
                ...i.tijdlijn,
                {
                  tijd: now,
                  actie: 'Geëscaleerd naar 112',
                  detail: 'Hulpdiensten gealarmeerd — brandweer onderweg',
                  type: 'critical',
                },
              ],
            }
          : i
      )
    }
    default:
      return state
  }
}

export default function App() {
  const [incidents, dispatch] = useReducer(incidentReducer, [])

  function handleAddScenario(scenario) {
    dispatch({ type: 'ADD', scenario })
  }

  return (
    <div className="app-layout">
      <Topbar />
      <Sidebar incidents={incidents} onAddScenario={handleAddScenario} />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard incidents={incidents} dispatch={dispatch} />} />
          <Route path="/bevrijders" element={<Bevrijders />} />
          <Route path="/liften" element={<Liften />} />
          <Route path="/rapportage" element={<Rapportage />} />
        </Routes>
      </main>
    </div>
  )
}
