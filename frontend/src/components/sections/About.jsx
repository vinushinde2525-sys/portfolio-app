import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Download } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { profile, education } from '../../utils/portfolioData'

export default function About() {
  return (
    <section id="about" className="section-padding bg-[var(--surface)]">
      <div className="container-custom grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden photo-cinematic relative" style={{
            background: 'linear-gradient(160deg,#F0E4D4 0%,#D4A373 60%,#8B5E3C 100%)'
          }}>
            {/* Replace with: <img src="/assets/about-photo.jpg" className="w-full h-full object-cover" /> */}
            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm font-medium tracking-wide text-center px-8">
              [ Natural outdoor portrait — warm tone, soft bokeh ]
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-brand-brown text-white rounded-2xl px-6 py-4 shadow-warm-lg">
            <div className="font-display text-2xl font-extrabold">2+</div>
            <div className="text-xs opacity-80 mt-0.5">Years of Experience</div>
          </div>
        </motion.div>

        <div>
          <SectionTitle eyebrow="About Me" title="Full Stack Developer &" accent="Problem Solver" />
          <p className="text-brand-muted leading-relaxed mb-6">{profile.bio}</p>

          <div className="flex items-center gap-2 text-sm text-brand-muted mb-2">
            <MapPin size={15} className="text-brand-brown" /> {profile.location}
          </div>

          <div className="mt-6 space-y-4">
            {education.map((e) => (
              <div key={e.title} className="flex gap-4 items-start border-b border-brand-border pb-4">
                <div className="w-9 h-9 rounded-lg bg-brand-brown/8 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={16} className="text-brand-brown" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-brand-gold uppercase tracking-wide">{e.year}</div>
                  <div className="text-sm font-bold text-brand-text mt-0.5">{e.title}</div>
                  <div className="text-xs text-brand-muted">{e.inst}</div>
                </div>
              </div>
            ))}
          </div>

          <a href={profile.resumeUrl} download className="btn-warm mt-8">
            Download Resume <Download size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
