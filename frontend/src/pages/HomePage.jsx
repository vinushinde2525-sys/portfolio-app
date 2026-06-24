import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Download, ChevronDown, Github, Linkedin, MessageCircle, ExternalLink } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import GlassCard from '../components/ui/GlassCard'
import { profile, stats } from '../utils/portfolioData'

const f = (d=0,y=40) => ({
  initial:{opacity:0,y},
  animate:{opacity:1,y:0},
  transition:{duration:0.8,delay:d,ease:[0.16,1,0.3,1]}
})

function FloatBadge({ icon, label, pos, delay }) {
  return (
    <motion.div
      initial={{opacity:0,scale:0.6}} animate={{opacity:1,scale:1}}
      transition={{duration:0.5,delay}}
      style={{
        position:'absolute',...pos,
        background:'rgba(10,4,1,0.85)',
        border:'1px solid rgba(244,98,31,0.25)',
        borderRadius:'0.875rem',
        backdropFilter:'blur(16px)',
        padding:'0.6rem 1rem',
        display:'flex',alignItems:'center',gap:'0.5rem',
        boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
        zIndex:5,
        animation:`float-slow ${2.5+delay}s ease-in-out infinite`,
      }}
    >
      <span style={{fontSize:'1.1rem'}}>{icon}</span>
      <span style={{fontSize:'0.72rem',fontWeight:700,color:'#fff',whiteSpace:'nowrap'}}>{label}</span>
    </motion.div>
  )
}

const BADGES = [
  {icon:'⚛️', label:'React',      pos:{top:'12%',left:'2%'},      delay:0.9},
  {icon:'🟨', label:'JavaScript', pos:{top:'8%',right:'8%'},      delay:1.0},
  {icon:'🟢', label:'Node.js',    pos:{bottom:'32%',left:'1%'},   delay:1.1},
  {icon:'🍃', label:'MongoDB',    pos:{bottom:'22%',right:'6%'},  delay:1.2},
  {icon:'◻️', label:'Next.js',    pos:{top:'40%',left:'0%'},      delay:1.3},
  {icon:'🔧', label:'Socket.IO',  pos:{top:'22%',right:'2%'},     delay:1.4},
]

export default function HomePage() {
  return (
    <PageTransition>
      {/* ── HERO ─────────────────────────────── */}
      <section style={{minHeight:'100vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',paddingTop:'70px'}}>
        {/* Cosmic bg image overlay */}
        <div style={{position:'absolute',inset:0,zIndex:0,overflow:'hidden'}}>
          <img src="/assets/cosmic-1.png" alt=""
            style={{position:'absolute',right:0,top:0,width:'65%',height:'100%',objectFit:'cover',objectPosition:'left center',opacity:0.18,maskImage:'linear-gradient(to left,rgba(0,0,0,0.8) 0%,transparent 80%)',WebkitMaskImage:'linear-gradient(to left,rgba(0,0,0,0.8) 0%,transparent 80%)'}}
            onError={e=>e.target.style.display='none'}
          />
        </div>

        <div className="container-custom" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem',alignItems:'center',position:'relative',zIndex:1}}>
          {/* Left text */}
          <div style={{display:'flex',flexDirection:'column',gap:'1.6rem'}}>
            <motion.div {...f(0.1)}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--fire)'}}>
                <span style={{width:'5px',height:'5px',background:'var(--fire)',borderRadius:'50%',display:'inline-block',boxShadow:'0 0 6px var(--fire)'}}/>
                Hello, I'm
              </span>
            </motion.div>

            <motion.div {...f(0.2)}>
              <h1 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'clamp(4rem,9vw,8rem)',fontWeight:900,lineHeight:0.92,letterSpacing:'-0.02em',margin:0}}>
                <span style={{display:'block',color:'#fff'}}>VINAYAK</span>
                <span style={{display:'block',background:'linear-gradient(90deg,#F4621F,#FF7A35,#FF9A3C)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',filter:'drop-shadow(0 0 20px rgba(244,98,31,0.4))'}}>SHINDE.</span>
              </h1>
            </motion.div>

            <motion.div {...f(0.3)}>
              <p style={{fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--text-secondary)',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <span style={{color:'var(--fire)'}}>&lt;/&gt;</span> MERN STACK DEVELOPER · FRESHER
              </p>
            </motion.div>

            <motion.p {...f(0.4)} style={{color:'var(--text-secondary)',lineHeight:1.8,maxWidth:'420px',fontSize:'0.93rem'}}>
              Building production-grade full-stack web applications with React, Node.js, Express & MongoDB. Automated testing, CI/CD pipelines, real-time features — all shipped to production.
            </motion.p>

            <motion.div {...f(0.5)} style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
              <Link to="/projects" style={{display:'inline-flex',alignItems:'center',gap:'0.6rem',padding:'0.8rem 1.6rem',background:'var(--fire)',color:'#fff',borderRadius:'100px',fontWeight:700,fontSize:'0.875rem',textDecoration:'none',transition:'all 0.25s ease'}}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 0 24px rgba(244,98,31,0.5)';e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='none'}}
              >View My Work <ArrowUpRight size={16}/></Link>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'0.6rem',padding:'0.8rem 1.6rem',background:'transparent',color:'#fff',borderRadius:'100px',fontWeight:600,fontSize:'0.875rem',textDecoration:'none',border:'1px solid rgba(255,255,255,0.2)',transition:'all 0.25s ease'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--fire)';e.currentTarget.style.background='rgba(244,98,31,0.1)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';e.currentTarget.style.background='transparent'}}
              ><ExternalLink size={16}/> View Resume</a>
            </motion.div>

            <motion.div {...f(0.6)} style={{display:'flex',gap:'0.6rem',alignItems:'center'}}>
              <span style={{fontSize:'0.62rem',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--text-muted)',marginRight:'0.25rem'}}>Connect</span>
              {[
                {icon:Github,       href:profile.social.github,  title:'GitHub'},
                {icon:Linkedin,     href:profile.social.linkedin, title:'LinkedIn'},
                {icon:MessageCircle,href:profile.whatsapp,        title:'WhatsApp'},
              ].map(({icon:Icon,href,title},i)=>(
                <a key={i} href={href} target="_blank" rel="noreferrer" className="social-btn" style={{width:'2rem',height:'2rem'}} title={title}><Icon size={14}/></a>
              ))}
            </motion.div>
          </div>

          {/* Right photo */}
          <div style={{position:'relative',display:'flex',justifyContent:'center',alignItems:'flex-end',minHeight:'560px'}}>
            {BADGES.map((b,i)=><FloatBadge key={i} {...b}/>)}
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'380px',height:'380px',borderRadius:'50%',border:'1px solid rgba(244,98,31,0.15)',animation:'ring-pulse 3s ease-in-out infinite',zIndex:1,pointerEvents:'none'}}/>
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'460px',height:'460px',borderRadius:'50%',border:'1px solid rgba(244,98,31,0.07)',animation:'ring-pulse 3s ease-in-out infinite 0.6s',zIndex:1,pointerEvents:'none'}}/>
            <motion.div
              animate={{y:[0,-12,0]}}
              transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}
              style={{position:'relative',zIndex:2,width:'100%',maxWidth:'500px'}}
            >
              <img src="/assets/hero-cosmic.png" alt="Vinayak Shinde"
                style={{width:'100%',objectFit:'contain',objectPosition:'bottom',filter:'drop-shadow(0 20px 60px rgba(244,98,31,0.3))'}}
                onError={e=>{e.target.src='/assets/profile.jpg'; e.target.style.borderRadius='50%'; e.target.style.width='320px'; e.target.style.height='320px'; e.target.style.objectFit='cover'}}
              />
            </motion.div>
            <div style={{position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',width:'60%',height:'200px',background:'radial-gradient(ellipse at center bottom,rgba(244,98,31,0.15) 0%,transparent 70%)',pointerEvents:'none'}}/>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{y:[0,7,0]}} transition={{duration:1.5,repeat:Infinity}}
          style={{position:'absolute',bottom:'2rem',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.4rem',zIndex:1}}>
          <span style={{fontSize:'0.55rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--text-muted)'}}>SCROLL DOWN</span>
          <ChevronDown size={16} style={{color:'var(--fire)'}}/>
        </motion.div>
      </section>

      {/* ── STATS BAR ───────────────────────── */}
      <section style={{background:'rgba(10,4,1,0.7)',borderTop:'1px solid rgba(244,98,31,0.1)',borderBottom:'1px solid rgba(244,98,31,0.1)',backdropFilter:'blur(16px)',position:'relative',zIndex:1}}>
        <div className="container-custom" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {stats.map((s,i)=>(
            <motion.div key={i}
              initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*0.1}}
              style={{padding:'2rem 1rem',textAlign:'center',borderRight:i<3?'1px solid rgba(244,98,31,0.08)':'none'}}
            >
              <div style={{fontSize:'0.58rem',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--fire)',marginBottom:'0.5rem'}}>{s.icon} {s.label}</div>
              <div style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'clamp(2rem,4vw,2.8rem)',fontWeight:900,color:'#fff',lineHeight:1}}>{s.value}{s.suffix}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUICK INTRO TEASER ───────────────── */}
      <section style={{padding:'6rem 0',position:'relative',zIndex:1}}>
        <div className="container-custom" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'center'}}>
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8}}>
            <div className="eyebrow" style={{marginBottom:'1rem'}}>&lt;/&gt; About Me</div>
            <h2 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'clamp(2.5rem,5vw,4rem)',fontWeight:900,lineHeight:0.95,marginBottom:'1.5rem'}}>
              BUILDING THE<br/>
              <span style={{background:'linear-gradient(90deg,var(--fire),var(--fire-bright))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>DIGITAL FUTURE</span>
            </h2>
            <p style={{color:'var(--text-secondary)',lineHeight:1.8,marginBottom:'2rem',fontSize:'0.93rem'}}>
              A passionate MERN Stack Developer from Maharashtra, India. I build scalable full-stack applications with real-world features — JWT auth, Socket.IO, automated testing, and CI/CD pipelines. Currently seeking internship or junior developer opportunities.
            </p>
            <Link to="/about" className="btn-fire">Learn More <ArrowUpRight size={16}/></Link>
          </motion.div>
          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8}}
            style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}
          >
            {[
              {title:'5 Projects Shipped',   desc:'All live-deployed with real features and working demos.'},
              {title:'66+ Automated Tests',  desc:'Jest, Vitest, and React Testing Library across all major projects.'},
              {title:'CI/CD Pipelines',      desc:'GitHub Actions running tests and builds on every push.'},
              {title:'BSc IT — 2026',        desc:'D.G. Tatkare Mahavidyalay, University of Mumbai. CGPI 7.18.'},
            ].map((c,i)=>(
              <GlassCard key={i} style={{padding:'1.5rem'}}>
                <h4 style={{fontSize:'0.875rem',fontWeight:800,color:'var(--fire)',marginBottom:'0.5rem'}}>{c.title}</h4>
                <p style={{fontSize:'0.76rem',color:'var(--text-secondary)',lineHeight:1.6}}>{c.desc}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
