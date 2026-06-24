import { motion } from 'framer-motion'

export default function ProgressBar({ label, value, delay=0 }) {
  return (
    <div style={{ marginBottom:'1.1rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.45rem' }}>
        <span style={{ fontSize:'0.8rem', fontWeight:600, color:'var(--text-primary)' }}>{label}</span>
        <span style={{ fontSize:'0.7rem', fontWeight:700, color:'var(--fire)' }}>{value}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width:0 }}
          whileInView={{ width:`${value}%` }}
          viewport={{ once:true, margin:'-40px' }}
          transition={{ duration:1.2, delay, ease:[0.16,1,0.3,1] }}
        />
      </div>
    </div>
  )
}
