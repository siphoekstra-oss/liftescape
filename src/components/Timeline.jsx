export default function Timeline({ entries }) {
  return (
    <div className="timeline">
      {entries.map((entry, i) => (
        <div className="timeline-entry" key={i}>
          <div className={`timeline-dot ${entry.type === 'critical' ? 'critical' : entry.type === 'ok' ? 'ok' : ''}`} />
          <div className="timeline-time">
            {new Date(entry.tijd).toLocaleTimeString('nl-NL', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </div>
          <div className="timeline-action">{entry.actie}</div>
          <div className="timeline-detail">{entry.detail}</div>
        </div>
      ))}
    </div>
  )
}
