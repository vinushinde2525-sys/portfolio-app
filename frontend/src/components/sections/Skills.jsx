import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { skillCategories } from '../../utils/portfolioData'

export default function Skills() {
  const [active, setActive] = useState('All')
  const categories = ['All', ...skillCategories.map((c) => c.name)]

  const visible =
    active === 'All'
      ? skillCategories.flatMap((c) => c.skills)
      : skillCategories.find((c) => c.name === active)?.skills || []

  return (
    <section id="skills" className="section-padding bg-[var(--bg)]">
      <div className="container-custom">
        <SectionTitle eyebrow="Skills & Technologies" title="My Technical" accent="Expertise" desc="Tools and technologies I use to build production-ready applications." />

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                active === c
                  ? 'bg-brand-brown text-white border-brand-brown'
                  : 'border-brand-border text-brand-muted hover:border-brand-brown hover:text-brand-brown'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {visible.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="card-warm p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-brand-text">{skill.name}</span>
                <span className="text-xs font-semibold text-brand-gold">{skill.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-brand-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-brown to-brand-gold"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
