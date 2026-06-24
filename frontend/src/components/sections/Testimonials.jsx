import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { testimonials } from '../../utils/portfolioData'

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-[var(--surface)]">
      <div className="container-custom">
        <SectionTitle eyebrow="Testimonials" title="What People" accent="Say" align="center" />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-warm p-7"
            >
              <Quote size={22} className="text-brand-gold mb-4" />
              <p className="text-sm text-brand-text leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <div className="font-bold text-sm text-brand-text">{t.name}</div>
                <div className="text-xs text-brand-muted">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
