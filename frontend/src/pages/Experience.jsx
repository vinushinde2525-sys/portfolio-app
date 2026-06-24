import { motion } from 'framer-motion'
import { Code2, GraduationCap, Rocket } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import GlassCard from '../components/ui/GlassCard'
import { education } from '../utils/portfolioData'

const f = (d=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:'-80px'},
  transition:{duration:0.7,delay:d,ease:[0.16,1,0.3,1]}
})

const JOURNEY = [
  {
    period: '2022 — Present',
    icon: Code2,
    title: 'Self-Directed Full Stack Development',
    org: 'Independent — Open Source & Personal Projects',
    desc: 'Built 5 production-grade MERN applications from scratch. Implemented JWT auth, Socket.IO real-time features, 66+ automated tests, GitHub Actions CI/CD pipelines, and Docker Compose multi-service environments. Deployed to Vercel, Render, and Netlify.',
    tags: ['React','TypeScript','Node.js','MongoDB','Socket.IO','JWT','Docker','Jest','Vitest','GitHub Actions'],
    note: null,
  },
  {
    period: '2021 — 2022',
    icon: GraduationCap,
    title: 'Certificate Course in Programming',
    org: 'Disha Computer Institute — Sr No: D4971921629',
    desc: 'Completed structured programming foundations: HTML (85), CSS (80), JavaScript (65). Achieved 76.67% overall.',
    tags: ['HTML','CSS','JavaScript'],
    note: 'Certificate ID: D4971921629 · Issued Apr 2025',
  },
  {
    period: '2021',
    icon: GraduationCap,
    title: 'Advance Diploma in Software Programming',
    org: 'Disha Computer Institute — Sr No: D7965332439',
    desc: 'Advanced diploma covering: C (90), C++ (85), Data Structures (75), Python (75), SQL (65), Java (50), .Net (55). Achieved 70.71% overall.',
    tags: ['C','C++','Python','Data Structures','SQL','Java'],
    note: 'Certificate ID: D7965332439 · Issued Sep 2025',
  },
]

export default function Experience() {
  return (
    <PageTransition>
      <div className="container-custom section-padding relative z-10">

        {/* Header */}
        <motion.div {...f(0)} style={{marginBottom:'2rem',textAlign:'center'}}>
          <div className="eyebrow" style={{justifyContent:'center',marginBottom:'1rem'}}>&lt;/&gt; My Journey</div>
          <h1 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'clamp(3rem,7vw,6rem)',fontWeight:900,lineHeight:0.95}}>
            WORK & <span style={{background:'linear-gradient(90deg,var(--fire),var(--fire-bright))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>EDUCATION</span>
          </h1>
        </motion.div>

        {/* Fresher status banner */}
        <motion.div {...f(0.05)} style={{marginBottom:'3rem'}}>
          <GlassCard style={{padding:'1.25rem 1.75rem',display:'flex',alignItems:'center',gap:'1rem',background:'rgba(244,98,31,0.04)',borderColor:'rgba(244,98,31,0.2)'}}>
            <Rocket size={20} style={{color:'var(--fire)',flexShrink:0}}/>
            <p style={{fontSize:'0.875rem',color:'var(--text-secondary)',lineHeight:1.6}}>
              <span style={{color:'#fff',fontWeight:700}}>Fresher — Currently Seeking Opportunities. </span>
              Built multiple production-level personal projects while completing BSc IT (graduating 2026). 5 live deployed applications with CI/CD, automated tests, and real-world features.
            </p>
          </GlassCard>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:'4rem',alignItems:'start'}}>

          {/* Left — journey timeline */}
          <div>
            <div className="eyebrow" style={{marginBottom:'2rem'}}><Code2 size={14}/> Development Journey</div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute',left:'7px',top:'8px',bottom:0,width:'2px',background:'linear-gradient(to bottom,var(--fire) 0%,rgba(244,98,31,0.1) 100%)',boxShadow:'0 0 8px rgba(244,98,31,0.3)'}}/>
              <div style={{display:'flex',flexDirection:'column',gap:'2rem',paddingLeft:'2.25rem'}}>
                {JOURNEY.map((item,idx)=>{
                  const Icon = item.icon
                  return (
                    <motion.div key={idx}
                      initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}}
                      viewport={{once:true,margin:'-80px'}}
                      transition={{duration:0.5,delay:idx*0.1}}
                      style={{position:'relative'}}
                    >
                      <div style={{position:'absolute',left:'-2.35rem',top:'1.1rem',width:'16px',height:'16px',borderRadius:'50%',background:'var(--fire)',border:'3px solid var(--bg-void)',boxShadow:'0 0 12px rgba(244,98,31,0.7)',zIndex:1}}/>
                      <GlassCard style={{padding:'1.5rem'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.75rem'}}>
                          <span style={{fontSize:'0.62rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'0.2rem 0.65rem',borderRadius:'100px',background:'rgba(244,98,31,0.1)',border:'1px solid rgba(244,98,31,0.25)',color:'var(--fire)'}}>{item.period}</span>
                        </div>
                        <div style={{display:'flex',alignItems:'flex-start',gap:'0.6rem',marginBottom:'0.5rem'}}>
                          <Icon size={16} style={{color:'var(--fire)',flexShrink:0,marginTop:'0.1rem'}}/>
                          <div>
                            <h3 style={{fontSize:'1rem',fontWeight:800,color:'#fff',lineHeight:1.2}}>{item.title}</h3>
                            <p style={{fontSize:'0.72rem',color:'var(--text-secondary)',marginTop:'0.15rem'}}>{item.org}</p>
                          </div>
                        </div>
                        <p style={{fontSize:'0.82rem',color:'var(--text-secondary)',lineHeight:1.7,marginBottom:'1rem'}}>{item.desc}</p>
                        {item.note && <p style={{fontSize:'0.65rem',color:'var(--fire)',marginBottom:'0.75rem',fontStyle:'italic'}}>{item.note}</p>}
                        <div style={{display:'flex',flexWrap:'wrap',gap:'0.35rem',paddingTop:'0.75rem',borderTop:'1px solid rgba(244,98,31,0.06)'}}>
                          {item.tags.map((t,ti)=><span key={ti} className="tech-badge">{t}</span>)}
                        </div>
                      </GlassCard>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right — education */}
          <div>
            <div className="eyebrow" style={{marginBottom:'2rem'}}><GraduationCap size={14}/> Education</div>
            <div style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
              {education.map((e,i)=>(
                <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.1}}>
                  <GlassCard style={{padding:'1.5rem',position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',top:0,right:0,fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'4rem',fontWeight:900,color:'rgba(244,98,31,0.04)',lineHeight:1,userSelect:'none'}}>{String(i+1).padStart(2,'0')}</div>
                    <span style={{fontSize:'0.62rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--fire)'}}>{e.year}</span>
                    <h3 style={{fontSize:'0.95rem',fontWeight:800,color:'#fff',marginTop:'0.35rem',marginBottom:'0.2rem'}}>{e.title}</h3>
                    <p style={{fontSize:'0.76rem',color:'var(--text-secondary)'}}>{e.inst}</p>
                    {e.detail && <p style={{fontSize:'0.7rem',color:'var(--fire)',marginTop:'0.3rem',fontWeight:700}}>{e.detail}</p>}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
