import { Link, useLocation } from 'react-router-dom'
import { Github, Linkedin, MessageCircle, Mail, Phone, MapPin, ArrowUp, ArrowUpRight } from 'lucide-react'
import { profile } from '../../utils/portfolioData'

const LINKS = [
  {label:'Home',       path:'/'},
  {label:'About',      path:'/about'},
  {label:'Skills',     path:'/skills'},
  {label:'Projects',   path:'/projects'},
  {label:'Experience', path:'/experience'},
  {label:'Contact',    path:'/contact'},
]
const SERVICES = ['Full Stack MERN','REST API Engineering','Real-Time Apps','UI/UX Implementation','Testing & CI/CD']

export default function Footer() {
  const loc = useLocation()
  if (loc.pathname.startsWith('/admin')) return null

  return (
    <footer style={{background:'rgba(5,2,16,0.95)',borderTop:'1px solid rgba(244,98,31,0.08)',position:'relative',zIndex:1,backdropFilter:'blur(10px)'}}>
      <div className="container-custom" style={{padding:'4rem 1.5rem 2rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1.2fr',gap:'3rem',marginBottom:'3rem'}}>

          {/* Brand */}
          <div>
            <div style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'2rem',fontWeight:900,color:'#fff',marginBottom:'0.75rem',letterSpacing:'-0.01em'}}>
              Vinayak<span style={{color:'var(--fire)'}}>.</span>
            </div>
            <p style={{fontSize:'0.82rem',color:'var(--text-secondary)',lineHeight:1.7,maxWidth:'200px',marginBottom:'1.25rem'}}>
              MERN Stack Developer fresher — building production-grade web applications with passion and precision.
            </p>
            <div style={{display:'flex',gap:'0.5rem'}}>
              {[
                {icon:Github,       href:profile.social.github,  title:'GitHub'},
                {icon:Linkedin,     href:profile.social.linkedin, title:'LinkedIn'},
                {icon:MessageCircle,href:profile.whatsapp,        title:'WhatsApp'},
                {icon:Mail,         href:`mailto:${profile.email}`,title:'Email'},
              ].map(({icon:Icon,href,title},i)=>(
                <a key={i} href={href} target={href.startsWith('mailto')?undefined:'_blank'} rel="noreferrer" className="social-btn" title={title}><Icon size={14}/></a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#fff',marginBottom:'1.25rem'}}>Quick Links</h4>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'0.6rem'}}>
              {LINKS.map(l=>(
                <li key={l.path}>
                  <Link to={l.path} style={{fontSize:'0.82rem',color:'var(--text-secondary)',textDecoration:'none',transition:'color 0.2s'}}
                    onMouseEnter={e=>e.target.style.color='var(--fire)'}
                    onMouseLeave={e=>e.target.style.color='var(--text-secondary)'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#fff',marginBottom:'1.25rem'}}>Services</h4>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'0.6rem'}}>
              {SERVICES.map(s=>(
                <li key={s} style={{fontSize:'0.82rem',color:'var(--text-secondary)'}}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#fff',marginBottom:'1.25rem'}}>Connect</h4>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'0.85rem',marginBottom:'1.5rem'}}>
              {[
                {icon:Mail,   v:profile.email},
                {icon:Phone,  v:profile.phone},
                {icon:MapPin, v:'Maharashtra, India'},
              ].map(({icon:Icon,v},i)=>(
                <li key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.6rem'}}>
                  <Icon size={12} style={{color:'var(--fire)',flexShrink:0,marginTop:'0.15rem'}}/>
                  <span style={{fontSize:'0.76rem',color:'var(--text-secondary)'}}>{v}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-fire" style={{fontSize:'0.76rem',padding:'0.5rem 1rem',display:'inline-flex'}}>
              Let's Talk <ArrowUpRight size={12}/>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'1.5rem',borderTop:'1px solid rgba(244,98,31,0.06)',flexWrap:'wrap',gap:'0.75rem'}}>
          <p style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>&copy; {new Date().getFullYear()} Vinayak Shinde. All rights reserved.</p>
          <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
            style={{width:'2rem',height:'2rem',borderRadius:'50%',background:'var(--fire)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',border:'none',cursor:'pointer',transition:'all 0.2s ease'}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 0 16px rgba(244,98,31,0.5)';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='none'}}
          ><ArrowUp size={13}/></button>
        </div>
      </div>
    </footer>
  )
}
