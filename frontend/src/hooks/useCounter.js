import { useState, useEffect, useRef } from 'react'

export function useCounter(target, duration = 1800, startOnMount = false) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(startOnMount)
  const ref = useRef(null)

  useEffect(() => {
    if (startOnMount) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [startOnMount])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      setCount(Math.floor(start))
      if (start >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return { count, ref }
}
