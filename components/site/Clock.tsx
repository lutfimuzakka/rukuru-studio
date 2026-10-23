'use client'

import { useEffect, useState } from 'react'

/** Local studio time, e.g. "10:42 in Malang". Rendered on the client only. */
export function Clock({ timezone, city }: { timezone: string; city: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: timezone })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [timezone])

  return (
    <span>
      <span className="tabular-nums">{time ?? '--:--'}</span> in {city}
    </span>
  )
}
