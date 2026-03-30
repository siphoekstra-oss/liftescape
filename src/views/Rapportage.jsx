import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from 'recharts'
import MetricCard from '../components/MetricCard'

const GOLD = '#C9A84C'
const GOLD_DIM = 'rgba(201, 168, 76, 0.3)'
const TEXT_MUTED = '#5A5248'
const TEXT_SEC = '#9A9080'
const BG_SEC = '#111111'

// Demo data: incidenten per dag (afgelopen 30 dagen)
const dagData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - 29 + i)
  return {
    dag: `${date.getDate()}/${date.getMonth() + 1}`,
    incidenten: Math.floor(Math.random() * 8) + 1,
  }
})

const scenarioData = [
  { name: 'A — Standaard', value: 42, color: '#2980B9' },
  { name: 'B — Buiten uren', value: 28, color: '#D4901A' },
  { name: 'C — Medisch', value: 18, color: '#C0392B' },
  { name: 'D — Geen contact', value: 12, color: '#8E44AD' },
]

const recenteIncidenten = [
  { id: 'INC-20260328-012', scenario: 'A', duur: '00:11:34', bevrijder: 'Jan de Vries', uitkomst: 'Opgelost' },
  { id: 'INC-20260328-011', scenario: 'C', duur: '00:08:22', bevrijder: 'Sophie van den Berg', uitkomst: 'Opgelost' },
  { id: 'INC-20260327-010', scenario: 'B', duur: '00:24:15', bevrijder: 'Pieter Bakker', uitkomst: 'Opgelost' },
  { id: 'INC-20260327-009', scenario: 'D', duur: '00:15:41', bevrijder: 'Mohammed El Amrani', uitkomst: 'Geëscaleerd' },
  { id: 'INC-20260326-008', scenario: 'A', duur: '00:09:58', bevrijder: 'Anna Smit', uitkomst: 'Opgelost' },
  { id: 'INC-20260326-007', scenario: 'A', duur: '00:12:03', bevrijder: 'Wouter de Groot', uitkomst: 'Opgelost' },
  { id: 'INC-20260325-006', scenario: 'C', duur: '00:07:45', bevrijder: 'Lisa Mulder', uitkomst: 'Opgelost' },
  { id: 'INC-20260325-005', scenario: 'B', duur: '00:28:30', bevrijder: 'Thomas Visser', uitkomst: 'Opgelost' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: BG_SEC,
        border: `1px solid ${GOLD_DIM}`,
        padding: '8px 12px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
      }}>
        <div style={{ color: TEXT_SEC }}>{label}</div>
        <div style={{ color: GOLD }}>{payload[0].value} incidenten</div>
      </div>
    )
  }
  return null
}

export default function Rapportage() {
  return (
    <div>
      <div className="view-header">
        <h1 className="view-title">Incidentrapportage</h1>
        <p className="view-subtitle">Overzicht en analyse van alle geregistreerde liftbevrijdingen</p>
      </div>

      <div className="metrics-row">
        <MetricCard label="Totaal incidenten" value="147" color="gold" sub="afgelopen 30 dagen" />
        <MetricCard label="Gem. oplostijd" value="14 min" color="warning" sub="van melding tot bevrijding" />
        <MetricCard label="Opgelost < 30 min" value="89%" color="ok" sub="binnen SLA-norm" />
        <MetricCard label="Escalaties naar 112" value="12" color="critical" sub="8.2% van totaal" />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-title">Incidenten per dag — afgelopen 30 dagen</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dagData}>
              <CartesianGrid stroke={GOLD_DIM} strokeDasharray="3 3" />
              <XAxis
                dataKey="dag"
                stroke={TEXT_MUTED}
                tick={{ fontSize: 10, fontFamily: 'DM Mono', fill: TEXT_MUTED }}
                interval={4}
              />
              <YAxis
                stroke={TEXT_MUTED}
                tick={{ fontSize: 10, fontFamily: 'DM Mono', fill: TEXT_MUTED }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="incidenten"
                stroke={GOLD}
                strokeWidth={2}
                dot={{ fill: GOLD, r: 3 }}
                activeDot={{ fill: GOLD, r: 5, stroke: '#E2C06A', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Verdeling per scenariotype</div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={scenarioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                stroke="none"
              >
                {scenarioData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                formatter={(value) => (
                  <span style={{ color: TEXT_SEC, fontFamily: 'DM Mono', fontSize: 11 }}>{value}</span>
                )}
              />
              <Tooltip
                contentStyle={{
                  background: BG_SEC,
                  border: `1px solid ${GOLD_DIM}`,
                  fontFamily: 'DM Mono',
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        <div className="chart-title" style={{ marginBottom: 12 }}>Recente afgesloten incidenten</div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Scenario</th>
                <th>Duur</th>
                <th>Bevrijder</th>
                <th>Uitkomst</th>
              </tr>
            </thead>
            <tbody>
              {recenteIncidenten.map(inc => (
                <tr key={inc.id}>
                  <td style={{ color: 'var(--gold)' }}>{inc.id}</td>
                  <td>Type {inc.scenario}</td>
                  <td>{inc.duur}</td>
                  <td style={{ fontFamily: 'var(--font-body)' }}>{inc.bevrijder}</td>
                  <td>
                    <span className={`status-badge ${inc.uitkomst === 'Opgelost' ? 'opgelost' : 'geescaleerd'}`}>
                      {inc.uitkomst}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
