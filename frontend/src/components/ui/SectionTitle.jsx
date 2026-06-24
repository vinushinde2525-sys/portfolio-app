import { motion } from 'framer-motion'

export default function SectionTitle({ eyebrow, title, accent, desc, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-14 ${alignClass}`}>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="eyebrow"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-display-md font-extrabold mt-3 text-balance"
      >
        {title} {accent && <em className="text-brand-brown font-extrabold not-italic">{accent}</em>}
      </motion.h2>
      {desc && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-muted mt-4 text-base leading-relaxed"
        >
          {desc}
        </motion.p>
      )}
    </div>
  )
}
