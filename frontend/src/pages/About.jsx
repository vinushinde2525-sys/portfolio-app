import { motion } from 'framer-motion'
import { Download, ExternalLink, MapPin, Mail, Phone, Code2, Database, Layout, FlaskConical } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import GlassCard from '../components/ui/GlassCard'
import { profile, education, certifications, services } from '../utils/portfolioData'

const f = (d=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:'-80px'},
  transition:{duration:0.7,delay:d,ease:[0.16,1,0.3,1]}
})

export default function About() {
  return (
    <PageTransition>
      <div className="container-custom section-padding relative z-10">

        {/* Header */}
        <motion.div {...f(0)} style={{marginBottom:'4rem',textAlign:'center'}}>
          <div className="eyebrow" style={{justifyContent:'center',marginBottom:'1rem'}}>&lt;/&gt; Who I Am</div>
          <h1 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'clamp(3rem,7vw,6rem)',fontWeight:900,lineHeight:0.95}}>
            ABOUT <span style={{background:'linear-gradient(90deg,var(--fire),var(--fire-bright))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>ME</span>
          </h1>
        </motion.div>

        {/* Split */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'4rem',alignItems:'start',marginBottom:'5rem'}}>

          {/* Left photo */}
          <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
            <motion.div {...f(0.1)}>
              <div style={{position:'relative',borderRadius:'1.5rem',overflow:'hidden',border:'1px solid rgba(244,98,31,0.2)',boxShadow:'0 0 60px rgba(244,98,31,0.12)',aspectRatio:'3/4',background:'var(--bg-card)'}}>
                <img src="/assets/hero-cosmic.png" alt="Vinayak Shinde"
                  style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}
                  onError={e=>{e.target.src='/assets/profile.jpg'}}
                />
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(2,1,6,0.7) 0%,transparent 50%)'}}/>
                <div style={{position:'absolute',bottom:'1.5rem',left:'1.5rem'}}>
                  <p style={{fontSize:'0.58rem',fontWeight:700,letterSpacing:'0.12em',color:'var(--fire)',textTransform:'uppercase',marginBottom:'0.2rem'}}>MERN Stack Developer</p>
                  <p style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'1.4rem',fontWeight:900,color:'#fff'}}>Vinayak Shinde</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...f(0.2)}>
              <GlassCard style={{padding:'1.5rem'}}>
                <p style={{fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--fire)',marginBottom:'1rem'}}>Contact Info</p>
                <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                  {[
                    {icon:MapPin, v:profile.location},
                    {icon:Mail,   v:profile.email},
                    {icon:Phone,  v:profile.phone},
                  ].map(({icon:Icon,v},i)=>(
                    <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.6rem',fontSize:'0.8rem'}}>
                      <Icon size={12} style={{color:'var(--fire)',flexShrink:0,marginTop:'0.15rem'}}/>
                      <span style={{color:'var(--text-secondary)',wordBreak:'break-word'}}>{v}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div {...f(0.25)} style={{display:'flex',gap:'0.75rem'}}>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-fire" style={{flex:1,justifyContent:'center',fontSize:'0.8rem'}}>
                <ExternalLink size={14}/> View Resume
              </a>
              <a href={profile.resumeUrl} download className="btn-ghost" style={{flex:1,justifyContent:'center',fontSize:'0.8rem'}}>
                <Download size={14}/> Download
              </a>
            </motion.div>
          </div>

          {/* Right bio */}
          <div style={{display:'flex',flexDirection:'column',gap:'2rem'}}>
            <motion.div {...f(0.15)}>
              <h2 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'1.8rem',fontWeight:900,color:'#fff',marginBottom:'1.25rem',lineHeight:1.1}}>
                A Developer Who Turns Ideas Into Clean, Functional Code.
              </h2>
              <p style={{color:'var(--text-secondary)',lineHeight:1.85,marginBottom:'1rem',fontSize:'0.92rem'}}>{profile.bio}</p>
              <p style={{color:'var(--text-secondary)',lineHeight:1.85,fontSize:'0.92rem'}}>
                I use AI-assisted development workflows (Claude AI, ChatGPT, Gemini) to accelerate prototyping and debugging while maintaining code quality and review discipline on real React/Node.js codebases. Seeking a MERN Stack Developer Internship or Junior Full-Stack role.
              </p>
            </motion.div>

            <motion.div {...f(0.2)}>
              <div style={{display:'flex',flexWrap:'wrap',gap:'0.6rem'}}>
                {['✦ Clean Code','✦ Test-Driven','✦ Fast Learner','✦ CI/CD Mindset','✦ 3D / WebGL','✦ Always Growing'].map((t,i)=>(
                  <span key={i} style={{padding:'0.4rem 1rem',borderRadius:'100px',fontSize:'0.78rem',fontWeight:600,background:'rgba(244,98,31,0.08)',border:'1px solid rgba(244,98,31,0.2)',color:'var(--fire)',cursor:'default'}}>{t}</span>
                ))}
              </div>
            </motion.div>

            <motion.div {...f(0.25)} style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
              {[{v:'5',l:'Projects Shipped'},{v:'66+',l:'Automated Tests'},{v:'BSc IT',l:'2026 Graduate'}].map((s,i)=>(
                <GlassCard key={i} style={{padding:'1.25rem',textAlign:'center'}}>
                  <div style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'2rem',fontWeight:900,color:'var(--fire)',lineHeight:1}}>{s.v}</div>
                  <div style={{fontSize:'0.62rem',fontWeight:600,color:'var(--text-secondary)',textTransform:'uppercase',letterSpacing:'0.08em',marginTop:'0.2rem'}}>{s.l}</div>
                </GlassCard>
              ))}
            </motion.div>

            <motion.div {...f(0.3)}>
              <p style={{fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'1rem'}}>What I Do</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
                {[
                  {icon:Code2,         label:'Full Stack MERN',      desc:'End-to-end React + Node apps'},
                  {icon:Database,      label:'REST API Engineering',  desc:'JWT, RBAC, scalable backends'},
                  {icon:Layout,        label:'Real-Time Features',    desc:'Socket.IO, live tracking'},
                  {icon:FlaskConical,  label:'Testing & CI/CD',       desc:'Jest, Vitest, GitHub Actions'},
                ].map((item,i)=>{
                  const Icon = item.icon
                  return (
                    <GlassCard key={i} style={{padding:'1.1rem',display:'flex',gap:'0.75rem',alignItems:'flex-start'}}>
                      <div style={{width:'2rem',height:'2rem',borderRadius:'0.5rem',background:'rgba(244,98,31,0.1)',border:'1px solid rgba(244,98,31,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--fire)',flexShrink:0}}>
                        <Icon size={14}/>
                      </div>
                      <div>
                        <p style={{fontSize:'0.78rem',fontWeight:700,color:'#fff',marginBottom:'0.1rem'}}>{item.label}</p>
                        <p style={{fontSize:'0.7rem',color:'var(--text-secondary)'}}>{item.desc}</p>
                      </div>
                    </GlassCard>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Education — REAL DATA */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3rem',marginBottom:'4rem'}}>
          <motion.div {...f(0.1)}>
            <div className="eyebrow" style={{marginBottom:'1.5rem'}}>🎓 Education</div>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              {education.map((e,i)=>(
                <GlassCard key={i} style={{padding:'1.25rem',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,right:0,fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'3.5rem',fontWeight:900,color:'rgba(244,98,31,0.04)',lineHeight:1,userSelect:'none'}}>{String(i+1).padStart(2,'0')}</div>
                  <span style={{fontSize:'0.62rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--fire)'}}>{e.year}</span>
                  <h4 style={{fontSize:'0.92rem',fontWeight:800,color:'#fff',margin:'0.3rem 0 0.15rem'}}>{e.title}</h4>
                  <p style={{fontSize:'0.76rem',color:'var(--text-secondary)'}}>{e.inst}</p>
                  {e.detail && <p style={{fontSize:'0.7rem',color:'var(--fire)',marginTop:'0.25rem',fontWeight:600}}>{e.detail}</p>}
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Certifications — REAL ONLY */}
          <motion.div {...f(0.15)}>
            <div className="eyebrow" style={{marginBottom:'1.5rem'}}>🏆 Certifications</div>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              {certifications.map((c,i)=>(
                <GlassCard key={i} style={{padding:'1.25rem',display:'flex',gap:'1rem',alignItems:'center'}}>
                  <div style={{width:'2.5rem',height:'2.5rem',borderRadius:'0.6rem',background:'rgba(244,98,31,0.1)',border:'1px solid rgba(244,98,31,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>🏅</div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:'0.82rem',fontWeight:700,color:'#fff',marginBottom:'0.15rem'}}>{c.title}</p>
                    <p style={{fontSize:'0.7rem',color:'var(--fire)'}}>{c.issuer} · {c.year}</p>
                    <p style={{fontSize:'0.65rem',color:'var(--text-muted)',marginTop:'0.1rem'}}>{c.score} · ID: {c.id}</p>
                  </div>
                  <a href={c.file} target="_blank" rel="noreferrer"
                    style={{flexShrink:0,padding:'0.3rem 0.7rem',borderRadius:'100px',fontSize:'0.65rem',fontWeight:700,background:'rgba(244,98,31,0.1)',border:'1px solid rgba(244,98,31,0.2)',color:'var(--fire)',textDecoration:'none',transition:'all 0.2s ease'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='var(--fire)';e.currentTarget.style.color='#fff'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(244,98,31,0.1)';e.currentTarget.style.color='var(--fire)'}}
                  >View ↗</a>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>

        {/* No Experience section — fresher note */}
        <motion.div {...f(0.1)}>
          <GlassCard style={{padding:'2rem',textAlign:'center',background:'rgba(244,98,31,0.04)',borderColor:'rgba(244,98,31,0.15)'}}>
            <p style={{fontSize:'0.65rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--fire)',marginBottom:'0.75rem'}}>Status</p>
            <h3 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'1.5rem',fontWeight:900,color:'#fff',marginBottom:'0.75rem'}}>
              Currently Seeking Software Developer / MERN Stack Opportunities
            </h3>
            <p style={{color:'var(--text-secondary)',fontSize:'0.875rem',lineHeight:1.7,maxWidth:'600px',margin:'0 auto'}}>
              Built multiple production-level full-stack applications while completing my Bachelor's in Information Technology (graduating 2026). 5 real projects with CI/CD, automated testing, and live deployments.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </PageTransition>
  )
}
