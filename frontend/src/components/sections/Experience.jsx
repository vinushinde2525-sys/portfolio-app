import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { experience } from '../../utils/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-[var(--surface)]">
      <div className="container-custom">
        <SectionTitle eyebrow="Experience" title="Professional" accent="Journey" />

        <div className="relative pl-10">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-brand-gold to-brand-sand" />
          {experience.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <span className="absolute -left-10 top-1.5 w-5 h-5 rounded-full bg-brand-brown border-4 border-[var(--surface)]" />
              <div className="card-warm p-6">
                <div className="text-xs font-bold uppercase tracking-wide text-brand-gold mb-1.5">{e.period}</div>
                <h3 className="font-bold text-brand-text mb-0.5">{e.title}</h3>
                <div className="text-sm text-brand-muted mb-3">{e.company}</div>
                <p className="text-sm text-brand-muted leading-relaxed mb-4">{e.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span key={t} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-brand-brown/8 text-brand-brown">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
