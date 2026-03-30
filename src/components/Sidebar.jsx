import { NavLink } from 'react-router-dom'

export default function Sidebar({ incidents, onAddScenario }) {
  const actief = incidents.filter(i => i.status === 'actief').length
  const afgerond = incidents.filter(i => i.status === 'opgelost').length
  const geescaleerd = incidents.filter(i => i.status === 'geescaleerd').length

  return (
    <nav className="sidebar">
      <div className="sidebar-group">
        <div className="sidebar-group-label">Dispatching</div>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <span className={`sidebar-dot ${actief > 0 ? 'critical' : 'muted'}`} />
          Actieve meldingen
          {actief > 0 && <span className="sidebar-badge">{actief}</span>}
        </NavLink>
        <NavLink
          to="/"
          end
          className="sidebar-item"
          onClick={(e) => e.preventDefault()}
        >
          <span className={`sidebar-dot ${afgerond > 0 ? 'ok' : 'muted'}`} />
          Afgerond
          {afgerond > 0 && <span className="sidebar-badge">{afgerond}</span>}
        </NavLink>
        <NavLink
          to="/"
          end
          className="sidebar-item"
          onClick={(e) => e.preventDefault()}
        >
          <span className={`sidebar-dot ${geescaleerd > 0 ? 'warning' : 'muted'}`} />
          Geëscaleerd
          {geescaleerd > 0 && <span className="sidebar-badge">{geescaleerd}</span>}
        </NavLink>
      </div>

      <div className="sidebar-group">
        <div className="sidebar-group-label">Netwerk</div>
        <NavLink
          to="/bevrijders"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <span className="sidebar-dot ok" />
          Bevrijders
          <span className="sidebar-badge">12</span>
        </NavLink>
        <NavLink
          to="/liften"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <span className="sidebar-dot dispatch" />
          Liften
          <span className="sidebar-badge">20</span>
        </NavLink>
      </div>

      <div className="sidebar-group">
        <div className="sidebar-group-label">Rapportage</div>
        <NavLink
          to="/rapportage"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <span className="sidebar-dot muted" />
          Incidentrapportage
        </NavLink>
      </div>

      <div className="sidebar-scenarios">
        <div className="sidebar-scenarios-label">Testscenario's</div>
        <div className="scenario-buttons">
          <button className="scenario-btn" onClick={() => onAddScenario('A')}>
            <span className="scenario-letter">A</span>
            Standaard
          </button>
          <button className="scenario-btn" onClick={() => onAddScenario('B')}>
            <span className="scenario-letter">B</span>
            Na sluitingstijd
          </button>
          <button className="scenario-btn" onClick={() => onAddScenario('C')}>
            <span className="scenario-letter">C</span>
            Medisch
          </button>
          <button className="scenario-btn" onClick={() => onAddScenario('D')}>
            <span className="scenario-letter">D</span>
            Geen contact
          </button>
        </div>
      </div>
    </nav>
  )
}
