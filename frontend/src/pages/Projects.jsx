import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Star, ArrowUpRight, Code2 } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import SkeletonCard from '../components/ui/SkeletonCard'
import { getProjects } from '../utils/api'
import { projectsSeed } from '../utils/portfolioData'

const f = (d=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:'-80px'},
  transition:{duration:0.7,delay:d,ease:[0.16,1,0.3,1]}
})

// Tilt card wrapper
function TiltCard({ children, style, className }) {
  const handleMove = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX-rect.left)/rect.width-0.5
    const y = (e.clientY-rect.top)/rect.height-0.5
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`
  }
  const handleLeave = e => { e.currentTarget.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)' }
  return (
    <div onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}
      style={{transition:'transform 0.3s ease',transformStyle:'preserve-3d',...style}}>
      {children}
    </div>
  )
}

function FeaturedCard({ project, idx }) {
  const isLeft = idx%2===0
  return (
    <motion.div {...f(0.1+idx*0.1)} style={{display:'grid',gridTemplateColumns:isLeft?'1.2fr 1fr':'1fr 1.2fr',gap:'2.5rem',alignItems:'center',marginBottom:'4rem'}}>
      {/* Image */}
      <div style={{order:isLeft?0:1}}>
        <TiltCard style={{borderRadius:'1.25rem',overflow:'hidden',border:'1px solid rgba(244,98,31,0.2)',boxShadow:'0 0 50px rgba(244,98,31,0.12)',aspectRatio:'16/10',position:'relative'}}>
          {project.image ? (
            <img src={project.image} alt={project.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
          ) : (
            <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#3D0D00,#1A0500)',display:'flex',alignItems:'center',justifyContent:'center'}}><Code2 size={40} style={{color:'var(--fire)',opacity:0.4}}/></div>
          )}
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(2,1,6,0.4) 0%,transparent 60%)',pointerEvents:'none'}}/>
          <div style={{position:'absolute',top:'0.75rem',left:'0.75rem',display:'flex',alignItems:'center',gap:'0.3rem',padding:'0.25rem 0.7rem',borderRadius:'100px',background:'var(--fire)',fontSize:'0.6rem',fontWeight:700,color:'#fff'}}>
            <Star size={9} fill="currentColor"/> FEATURED
          </div>
        </TiltCard>
      </div>

      {/* Content */}
      <div style={{order:isLeft?1:0,display:'flex',flexDirection:'column',gap:'1.25rem'}}>
        <div className="eyebrow"><span>0{idx+1}</span> — Featured</div>
        <h3 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'2rem',fontWeight:900,color:'#fff',lineHeight:1.05}}>{project.title}</h3>
        <p style={{color:'var(--text-secondary)',lineHeight:1.8,fontSize:'0.875rem'}}>{project.description}</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem'}}>
          {project.tags.map((t,i)=><span key={i} className="tech-badge">{t}</span>)}
        </div>
        <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
          {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="btn-fire" style={{fontSize:'0.8rem',padding:'0.6rem 1.2rem'}}>Live Demo <ArrowUpRight size={14}/></a>}
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost" style={{fontSize:'0.8rem',padding:'0.6rem 1.2rem'}}><Github size={14}/> GitHub</a>}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('all')

  useEffect(()=>{
    async function load() {
      try {
        const {data} = await getProjects()
        setProjects(data?.length>0 ? data : projectsSeed)
      } catch { setProjects(projectsSeed) }
      finally { setLoading(false) }
    }
    load()
  },[])

  const featured  = projects.filter(p=>p.featured)
  const secondary = projects.filter(p=>!p.featured)
  const filteredSec = tab==='all' ? secondary : secondary.filter(p=>p.category?.toLowerCase()===tab)

  return (
    <PageTransition>
      <div className="container-custom section-padding relative z-10">

        {/* Header */}
        <motion.div {...f(0)} style={{marginBottom:'4rem',textAlign:'center'}}>
          <div className="eyebrow" style={{justifyContent:'center',marginBottom:'1rem'}}>&lt;/&gt; Portfolio — 5 Real Projects</div>
          <h1 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'clamp(3rem,7vw,6rem)',fontWeight:900,lineHeight:0.95,marginBottom:'1.25rem'}}>
            MY <span style={{background:'linear-gradient(90deg,var(--fire),var(--fire-bright))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>PROJECTS</span>
          </h1>
          <p style={{color:'var(--text-secondary)',maxWidth:'500px',margin:'0 auto',fontSize:'0.95rem'}}>
            5 production-deployed applications with live demos, real code, and automated tests.
          </p>
        </motion.div>

        {/* Featured */}
        <div style={{marginBottom:'5rem'}}>
          <motion.div {...f(0.05)} style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'3rem'}}>
            <div className="eyebrow">Featured Work</div>
            <div style={{flex:1,height:'1px',background:'rgba(244,98,31,0.12)'}}/>
          </motion.div>
          {loading
            ? <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem'}}><SkeletonCard/><SkeletonCard/></div>
            : featured.map((p,i)=><FeaturedCard key={p._id} project={p} idx={i}/>)
          }
        </div>

        {/* Secondary */}
        <div>
          <motion.div {...f(0.05)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem',marginBottom:'2rem'}}>
            <div className="eyebrow">More Projects</div>
            <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
              {['all','fullstack','frontend'].map(t=>(
                <button key={t} onClick={()=>setTab(t)} className={`filter-tab ${tab===t?'active':''}`}>
                  {t==='all'?'All':t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1.5rem'}}>
            <AnimatePresence mode="popLayout">
              {(loading?[1,2,3]:filteredSec).map((p,i)=>
                loading ? <SkeletonCard key={i}/> : (
                  <motion.div key={p._id} layout
                    initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.92}}
                    transition={{duration:0.35}}
                  >
                    <TiltCard style={{height:'100%'}}>
                      <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'1.25rem',overflow:'hidden',height:'100%',display:'flex',flexDirection:'column',transition:'border-color 0.3s ease,box-shadow 0.3s ease'}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(244,98,31,0.3)';e.currentTarget.style.boxShadow='0 0 30px rgba(244,98,31,0.08)'}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.boxShadow='none'}}
                      >
                        <div style={{height:'180px',position:'relative',overflow:'hidden'}}>
                          {p.image
                            ? <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.5s ease'}} onMouseEnter={e=>e.target.style.transform='scale(1.05)'} onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
                            : <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#2A0800,#0D0200)',display:'flex',alignItems:'center',justifyContent:'center'}}><Code2 size={32} style={{color:'var(--fire)',opacity:0.3}}/></div>
                          }
                          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(2,1,6,0.5) 0%,transparent 60%)'}}/>
                          <div style={{position:'absolute',top:'0.6rem',left:'0.6rem',padding:'0.2rem 0.65rem',borderRadius:'100px',background:'var(--fire)',fontSize:'0.58rem',fontWeight:700,color:'#fff',textTransform:'uppercase'}}>{p.category}</div>
                        </div>
                        <div style={{padding:'1.25rem',flex:1,display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                          <h3 style={{fontSize:'1rem',fontWeight:800,color:'#fff',lineHeight:1.3}}>{p.title}</h3>
                          <p style={{fontSize:'0.78rem',color:'var(--text-secondary)',lineHeight:1.6,flex:1}}>{p.description}</p>
                          <div style={{display:'flex',flexWrap:'wrap',gap:'0.35rem'}}>
                            {p.tags?.slice(0,4).map((t,ti)=><span key={ti} className="tech-badge">{t}</span>)}
                          </div>
                          <div style={{display:'flex',gap:'0.5rem',paddingTop:'0.5rem',borderTop:'1px solid rgba(244,98,31,0.06)'}}>
                            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost" style={{flex:1,justifyContent:'center',padding:'0.45rem',fontSize:'0.72rem'}}><Github size={13}/> Code</a>}
                            {p.live   && <a href={p.live}   target="_blank" rel="noreferrer" className="btn-fire"  style={{flex:1,justifyContent:'center',padding:'0.45rem',fontSize:'0.72rem'}}><ExternalLink size={13}/> Demo</a>}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
