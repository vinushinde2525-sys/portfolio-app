import { motion } from 'framer-motion'

export default function GlassCard({ children, className='', style={}, hover=true, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y:-4, borderColor:'rgba(244,98,31,0.3)', boxShadow:'0 0 30px rgba(244,98,31,0.1), inset 0 1px 0 rgba(255,255,255,0.04)' } : {}}
      transition={{ duration:0.3 }}
      className={`cosmic-card ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}
