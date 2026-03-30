import { useState, useEffect } from 'react'

export function useElapsedTime(startTimestamp) {
  const [elapsed, setElapsed] = useState('00:00:00')

  useEffect(() => {
    if (!startTimestamp) return

    const update = () => {
      const diff = Date.now() - startTimestamp
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0')
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
      setElapsed(`${h}:${m}:${s}`)
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [startTimestamp])

  return elapsed
}
