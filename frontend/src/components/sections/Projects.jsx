import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import AnimatedCard from '../ui/AnimatedCard'
import { projectsSeed } from '../../utils/portfolioData'

const FILTERS = ['all', 'fullstack', 'frontend', 'backend']
const GRADIENTS = [
  'linear-gradient(135deg,#F0E4D4,#D4A373)',
  'linear-gradient(135deg,#E9D9C2,#C98A53)',
  'linear-gradient(135deg,#D4A373,#8B5E3C)',
  'linear-gradient(135deg,#F4A261,#D4A373)',
  'linear-gradient(135deg,#F0E4D4,#F4A261)',
  'linear-gradient(135deg,#8B5E3C,#6B4828)',
]

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? projectsSeed : projectsSeed.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section-padding bg-[var(--bg)]">
      <div className="container-custom">
        <SectionTitle eyebrow="Featured Work" title="Recent" accent="Projects" desc="A curated selection of full-stack projects showcasing real-world problem solving." />

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border capitalize transition-colors ${
                filter === f
                  ? 'bg-brand-brown text-white border-brand-brown'
                  : 'border-brand-border text-brand-muted hover:border-brand-brown hover:text-brand-brown'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <AnimatedCard className="overflow-hidden h-full flex flex-col">
                <div className="h-44" style={{ background: GRADIENTS[i % GRADIENTS.length] }} />
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-brand-gold mb-2">{p.category}</span>
                  <h3 className="font-bold text-brand-text mb-2">{p.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed mb-4 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-brown/8 text-brand-brown">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a href={p.live} target="_blank" rel="noreferrer" className="flex-1 text-center text-sm font-semibold py-2 rounded-lg bg-brand-brown text-white hover:bg-brand-brown-dark transition-colors flex items-center justify-center gap-1.5">
                      Live Demo <ExternalLink size={13} />
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer" className="flex-1 text-center text-sm font-semibold py-2 rounded-lg border border-brand-border text-brand-text hover:border-brand-brown transition-colors flex items-center justify-center gap-1.5">
                      <Github size={13} /> Code
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
