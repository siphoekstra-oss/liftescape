export default function ResponderCard({ naam, bedrijf, certificering, afstand, eta }) {
  const initialen = naam
    .split(' ')
    .filter(w => w[0] === w[0].toUpperCase())
    .map(w => w[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="responder-card">
      <div className="responder-avatar">{initialen}</div>
      <div className="responder-info">
        <div className="responder-name">{naam}</div>
        <div className="responder-detail">{bedrijf} — {certificering}</div>
      </div>
      <div className="responder-meta">
        <div className="responder-eta">ETA: {eta}</div>
        <div className="responder-distance">{afstand}</div>
      </div>
    </div>
  )
}
