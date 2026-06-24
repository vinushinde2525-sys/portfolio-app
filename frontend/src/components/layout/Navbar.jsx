import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const NAV = [
  {label:'Home',       path:'/'},
  {label:'About',      path:'/about'},
  {label:'Skills',     path:'/skills'},
  {label:'Projects',   path:'/projects'},
  {label:'Experience', path:'/experience'},
  {label:'Contact',    path:'/contact'},
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>40)
    window.addEventListener('scroll',fn,{passive:true})
    return ()=>window.removeEventListener('scroll',fn)
  },[])
  useEffect(()=>setOpen(false),[location])

  if(location.pathname.startsWith('/admin')) return null

  const active = p => p==='/' ? location.pathname==='/' : location.pathname.startsWith(p)

  return (
    <>
      <motion.nav
        initial={{y:-80,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.7,ease:[0.16,1,0.3,1]}}
        style={{
          position:'fixed',top:0,left:0,right:0,zIndex:100,
          background: scrolled ? 'rgba(2,1,6,0.88)' : 'rgba(2,1,6,0.3)',
          backdropFilter:'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(244,98,31,0.12)' : '1px solid transparent',
          transition:'all 0.4s ease',
        }}
      >
        <div className="container-custom" style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:'70px'}}>
          {/* Logo */}
          <Link to="/" style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'1.6rem',fontWeight:900,color:'#fff',letterSpacing:'-0.01em',textDecoration:'none'}}>
            Vinayak<span style={{color:'var(--fire)'}}>.</span>
          </Link>

          {/* Desktop links */}
          <div style={{display:'flex',gap:'0.15rem',alignItems:'center'}} className="hidden md:flex">
            {NAV.map(l=>(
              <Link key={l.path} to={l.path} style={{
                position:'relative',padding:'0.5rem 0.85rem',fontSize:'0.875rem',fontWeight:500,
                color:active(l.path)?'#fff':'var(--text-secondary)',
                textDecoration:'none',transition:'color 0.2s ease',borderRadius:'0.4rem',
              }}
                onMouseEnter={e=>{ if(!active(l.path)) e.currentTarget.style.color='#fff' }}
                onMouseLeave={e=>{ if(!active(l.path)) e.currentTarget.style.color='var(--text-secondary)' }}
              >
                {l.label}
                {active(l.path) && (
                  <motion.div layoutId="nav-line" style={{
                    position:'absolute',bottom:'2px',left:'0.85rem',right:'0.85rem',
                    height:'2px',background:'var(--fire)',borderRadius:'2px',
                    boxShadow:'0 0 8px var(--fire)',
                  }} />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
            <Link to="/contact" className="hidden md:inline-flex btn-fire" style={{padding:'0.55rem 1.3rem',fontSize:'0.82rem'}}>
              Let's Talk <ArrowUpRight size={14} />
            </Link>
            <button onClick={()=>setOpen(!open)} className="md:hidden" style={{color:'#fff',padding:'0.25rem'}}>
              {open ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            style={{position:'fixed',top:'70px',left:0,right:0,zIndex:99,
              background:'rgba(2,1,6,0.97)',backdropFilter:'blur(24px)',
              borderBottom:'1px solid rgba(244,98,31,0.1)',
              padding:'1.5rem',display:'flex',flexDirection:'column',gap:'0.5rem',
            }}
          >
            {NAV.map(l=>(
              <Link key={l.path} to={l.path} style={{
                padding:'0.8rem 1rem',borderRadius:'0.6rem',fontSize:'1rem',fontWeight:600,
                color:active(l.path)?'var(--fire)':'#fff',
                background:active(l.path)?'rgba(244,98,31,0.08)':'transparent',
                border:active(l.path)?'1px solid rgba(244,98,31,0.2)':'1px solid transparent',
                textDecoration:'none',
              }}>{l.label}</Link>
            ))}
            <Link to="/contact" className="btn-fire" style={{justifyContent:'center',marginTop:'0.5rem'}}>
              Let's Talk <ArrowUpRight size={14}/>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
