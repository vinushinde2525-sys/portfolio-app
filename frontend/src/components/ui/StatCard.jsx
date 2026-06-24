import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

export default function StatCard({ icon: Icon, value, suffix = '', label, sublabel, color = 'var(--fire)' }) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count  = useCountUp(value, 1200, inView)

  return (
    <div
      ref={ref}
      className="glass-card p-6 flex flex-col items-start gap-1"
      style={{ minWidth: 0 }}
    >
      {Icon && (
        <div className="flex items-center gap-2 mb-1">
          <Icon size={16} style={{ color }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
            {label}
          </span>
        </div>
      )}
      <div className="text-3xl font-black" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
        {count}{suffix}
      </div>
      {sublabel && (
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{sublabel}</div>
      )}
    </div>
  )
}
