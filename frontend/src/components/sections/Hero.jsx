import { motion } from 'framer-motion'
import { ArrowUpRight, Download, ChevronDown } from 'lucide-react'
import { profile, stats } from '../../utils/portfolioData'
import { useTypewriter } from '../../hooks/useTypewriter'
import ParticleField from '../3d/ParticleField'

export default function Hero() {
  const typed = useTypewriter(
    ['Crafting Digital Experiences', 'Building Scalable Applications', 'MERN Stack Developer', 'Problem Solver & Builder'],
    { pauseMs: 2200 }
  )

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Cinematic photo backdrop placeholder — replace bg-image with your actual photo asset */}
      <div className="absolute inset-0 photo-cinematic">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(250,247,242,0) 0%, rgba(250,247,242,0.55) 65%, rgba(250,247,242,0.96) 100%), linear-gradient(120deg, #E9D9C2 0%, #D4A373 35%, #C98A53 60%, #8B5E3C 100%)',
          }}
        />
        {/* Soft light rays */}
        <div className="absolute inset-0 mix-blend-soft-light opacity-60" style={{
          background: 'radial-gradient(ellipse 70% 50% at 75% 25%, rgba(244,162,97,0.55), transparent 60%)'
        }} />
        {/* Mist layer */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{
          background: 'linear-gradient(180deg, transparent, rgba(250,247,242,0.7))'
        }} />
        {/* Replace this block with: <img src="/assets/hero-photo.jpg" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0 flex items-center justify-center text-brand-brown/25 text-sm font-medium tracking-widest uppercase">
          [ Your double-exposure portrait photo goes here — see /docs/ASSET_GUIDE.md ]
        </div>
      </div>

      <ParticleField />

      <div className="relative z-10 container-custom pb-24 pt-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-brand-border rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-brand-brown uppercase">Available for Opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-display-xl font-extrabold text-brand-text max-w-4xl"
        >
          {profile.name.split(' ')[0]}<br />
          <span className="text-brand-brown">{profile.name.split(' ')[1]}.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-brand-muted font-medium mt-4"
        >
          {profile.role} <span className="text-brand-gold">·</span>{' '}
          <span className="text-brand-brown font-semibold">{typed}</span>
          <span className="inline-block w-[2px] h-5 bg-brand-gold ml-1 align-middle animate-pulse" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base text-brand-muted max-w-xl mt-5 leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          <button onClick={() => scrollTo('#projects')} className="btn-warm">
            View Projects <ArrowUpRight size={16} />
          </button>
          <a href={profile.resumeUrl} download className="btn-ghost">
            Download Resume <Download size={16} />
          </a>
          <button onClick={() => scrollTo('#contact')} className="btn-ghost">
            Contact Me
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-x-10 gap-y-4 mt-14 border-t border-brand-border pt-8 max-w-2xl"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-extrabold text-brand-brown">
                {s.value}<span className="text-brand-gold">{s.suffix}</span>
              </div>
              <div className="text-xs text-brand-muted font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo('#about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-brand-muted flex flex-col items-center gap-1 text-xs"
        aria-label="Scroll down"
      >
        Scroll <ChevronDown size={16} />
      </motion.button>
    </section>
  )
}
