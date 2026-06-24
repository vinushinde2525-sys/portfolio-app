import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { certifications } from '../../utils/portfolioData'

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-[var(--bg)]">
      <div className="container-custom">
        <SectionTitle eyebrow="Certifications" title="Continuous" accent="Learning" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-warm p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand-brown/8 flex items-center justify-center mx-auto mb-4">
                <Award size={20} className="text-brand-brown" />
              </div>
              <h3 className="font-bold text-sm text-brand-text mb-1">{c.title}</h3>
              <p className="text-xs text-brand-muted">{c.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
