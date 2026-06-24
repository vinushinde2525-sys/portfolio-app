import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedCard({ children, className = '', tilt = true }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e) => {
    if (!tilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / rect.height) * -8
    const rotateY = ((x - rect.width / 2) / rect.width) * 8
    setTransform(`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`)
  }

  const handleMouseLeave = () => setTransform('perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)')

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)' }}
      className={`card-warm ${className}`}
    >
      {children}
    </motion.div>
  )
}
