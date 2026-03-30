import { useState, useEffect } from 'react'

export default function Topbar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const clock = time.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-logo">LE</span>
        <span className="topbar-name">Liftescape</span>
      </div>
      <div className="topbar-center">
        <div className="topbar-live-badge">
          <span className="topbar-live-dot" />
          Live monitoring
        </div>
      </div>
      <div className="topbar-right">
        <span className="topbar-clock">{clock}</span>
        <span className="topbar-operator">Operator: S. Ekstra</span>
      </div>
    </header>
  )
}
