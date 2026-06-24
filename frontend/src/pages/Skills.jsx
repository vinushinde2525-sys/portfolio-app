import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Code, Server, Database, Wrench, TestTube, Box } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import GlassCard from '../components/ui/GlassCard'
import ProgressBar from '../components/ui/ProgressBar'
import { skillCategories } from '../utils/portfolioData'

const f = (d=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:'-80px'},
  transition:{duration:0.7,delay:d,ease:[0.16,1,0.3,1]}
})

// Magnetic hover skill badge
function SkillBadge({ name, level, delay=0 }) {
  const ref = useRef()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-30,30], [8,-8])
  const rotY = useTransform(x, [-30,30], [-8,8])

  const handleMove = e => {
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width/2)
    y.set(e.clientY - rect.top - rect.height/2)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  const pct = level
  const color = pct >= 85 ? '#F4621F' : pct >= 70 ? '#FF7A35' : '#C44D14'

  return (
    <motion.div ref={ref}
      initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}}
      viewport={{once:true}} transition={{duration:0.4,delay}}
      onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{rotateX:rotX,rotateY:rotY,transformStyle:'preserve-3d',transformPerspective:400,cursor:'default'}}
    >
      <motion.div
        whileHover={{scale:1.08,boxShadow:`0 0 20px ${color}40`}}
        transition={{duration:0.2}}
        style={{
          padding:'0.8rem 1rem', borderRadius:'0.75rem',
          background:'var(--bg-card)', border:'1px solid var(--border)',
          display:'flex', flexDirection:'column', gap:'0.5rem',
          backdropFilter:'blur(12px)',
        }}
      >
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:'0.78rem',fontWeight:700,color:'#fff'}}>{name}</span>
          <span style={{fontSize:'0.68rem',fontWeight:800,color}}>{pct}%</span>
        </div>
        <div style={{height:'3px',background:'rgba(255,255,255,0.06)',borderRadius:'100px',overflow:'hidden'}}>
          <motion.div
            initial={{width:0}}
            whileInView={{width:`${pct}%`}}
            viewport={{once:true}} transition={{duration:1,delay,ease:[0.16,1,0.3,1]}}
            style={{height:'100%',borderRadius:'100px',background:`linear-gradient(90deg,${color},var(--fire-bright))`,boxShadow:`0 0 6px ${color}80`}}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

const CAT_META = {
  'Frontend':      { icon:Code,        emoji:'⚛️',  cols:3 },
  'Backend':       { icon:Server,      emoji:'⚙️',  cols:3 },
  'Database':      { icon:Database,    emoji:'🍃',  cols:2 },
  'Tools & DevOps':{ icon:Wrench,      emoji:'🔧',  cols:3 },
}

const TECH_CLOUD = [
  'React.js','Node.js','Express.js','MongoDB','TypeScript','JavaScript',
  'Tailwind CSS','Redux Toolkit','Socket.IO','JWT Auth','Three.js / R3F',
  'React Query','Framer Motion','Git & GitHub','Docker','GitHub Actions',
  'Vitest','Jest','Supertest','Vercel','Netlify','Render','HTML5','CSS3',
  'RBAC','REST APIs','Mongoose','React Router',
]

export default function Skills() {
  return (
    <PageTransition>
      <div className="container-custom section-padding relative z-10">

        {/* Header */}
        <motion.div {...f(0)} style={{marginBottom:'4rem',textAlign:'center'}}>
          <div className="eyebrow" style={{justifyContent:'center',marginBottom:'1rem'}}>&lt;/&gt; Technical Stack</div>
          <h1 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'clamp(3rem,7vw,6rem)',fontWeight:900,lineHeight:0.95,marginBottom:'1.25rem'}}>
            MY <span style={{background:'linear-gradient(90deg,var(--fire),var(--fire-bright))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>ARSENAL</span>
          </h1>
          <p style={{color:'var(--text-secondary)',maxWidth:'450px',margin:'0 auto',fontSize:'0.95rem'}}>
            Technologies I use daily to build production-grade MERN applications.
          </p>
        </motion.div>

        {/* Bento skill grid */}
        {skillCategories.map((cat, cidx) => {
          const meta = CAT_META[cat.name] || { icon:Box, emoji:'🔹', cols:3 }
          const Icon = meta.icon
          return (
            <motion.div key={cidx} {...f(0.05+cidx*0.05)} style={{marginBottom:'2rem'}}>
              <GlassCard style={{padding:'2rem'}}>
                {/* Category header */}
                <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'1.75rem'}}>
                  <div style={{width:'2.5rem',height:'2.5rem',borderRadius:'0.6rem',background:'rgba(244,98,31,0.1)',border:'1px solid rgba(244,98,31,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--fire)'}}>
                    <Icon size={18}/>
                  </div>
                  <div>
                    <h3 style={{fontSize:'1.1rem',fontWeight:900,color:'#fff',lineHeight:1}}>{cat.name}</h3>
                    <p style={{fontSize:'0.68rem',color:'var(--text-secondary)',marginTop:'0.15rem'}}>{cat.skills.length} technologies</p>
                  </div>
                  <div style={{marginLeft:'auto',fontSize:'1.4rem'}}>{meta.emoji}</div>
                </div>
                {/* Magnetic badges grid */}
                <div style={{display:'grid',gridTemplateColumns:`repeat(${meta.cols},1fr)`,gap:'0.75rem'}}>
                  {cat.skills.map((s,si)=>(
                    <SkillBadge key={si} name={s.name} level={s.level} delay={si*0.05} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )
        })}

        {/* Metrics row */}
        <motion.div {...f(0.3)} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'2.5rem'}}>
          {[
            {v:'20+',l:'Technologies'},
            {v:'66+',l:'Automated Tests Written'},
            {v:'3',   l:'Live Deployment Platforms'},
            {v:'∞',  l:'Always Learning'},
          ].map((s,i)=>(
            <GlassCard key={i} style={{padding:'1.5rem',textAlign:'center'}}>
              <div style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'2.5rem',fontWeight:900,color:'var(--fire)',lineHeight:1}}>{s.v}</div>
              <div style={{fontSize:'0.62rem',fontWeight:600,color:'var(--text-secondary)',textTransform:'uppercase',letterSpacing:'0.08em',marginTop:'0.25rem'}}>{s.l}</div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Full tech cloud */}
        <motion.div {...f(0.35)}>
          <GlassCard style={{padding:'2rem',textAlign:'center'}}>
            <p style={{fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--fire)',marginBottom:'1.5rem'}}>Full Tech Stack</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'0.55rem',justifyContent:'center'}}>
              {TECH_CLOUD.map((t,i)=>(
                <motion.span key={i}
                  initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}}
                  viewport={{once:true}} transition={{delay:i*0.02}}
                  whileHover={{scale:1.1,color:'#fff',borderColor:'var(--fire)'}}
                  style={{padding:'0.4rem 0.9rem',borderRadius:'100px',fontSize:'0.73rem',fontWeight:600,background:'rgba(244,98,31,0.06)',border:'1px solid rgba(244,98,31,0.14)',color:'var(--text-secondary)',cursor:'default',transition:'color 0.2s,border-color 0.2s'}}
                >{t}</motion.span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </PageTransition>
  )
}
