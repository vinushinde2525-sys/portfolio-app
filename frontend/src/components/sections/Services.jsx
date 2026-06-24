import { motion } from 'framer-motion'
import { Code2, Server, Palette, Database } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { services } from '../../utils/portfolioData'

const ICONS = [Code2, Server, Palette, Database]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-[var(--surface)]">
      <div className="container-custom">
        <SectionTitle eyebrow="What I Do" title="Services &" accent="Capabilities" />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-warm p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-brown/8 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-brown" />
                </div>
                <h3 className="font-bold text-brand-text mb-2">{s.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
