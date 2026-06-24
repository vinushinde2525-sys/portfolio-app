import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, ArrowUpRight } from 'lucide-react'
import toast from 'react-hot-toast'
import PageTransition from '../components/layout/PageTransition'
import GlassCard from '../components/ui/GlassCard'
import { sendMessage } from '../utils/api'
import { profile } from '../utils/portfolioData'

const f = (d=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:'-80px'},
  transition:{duration:0.7,delay:d,ease:[0.16,1,0.3,1]}
})

const iBase = {
  width:'100%', padding:'0.8rem 1rem',
  background:'rgba(255,255,255,0.03)',
  border:'1px solid rgba(244,98,31,0.12)',
  borderRadius:'0.6rem', fontSize:'0.875rem',
  color:'#fff', outline:'none',
  fontFamily:"'Inter',sans-serif",
  transition:'all 0.25s ease',
}

function Field({ as:Tag='input', label, required, ...props }) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'0.4rem'}}>
      <label style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--text-secondary)'}}>
        {label}{required && ' *'}
      </label>
      <Tag {...props}
        style={{...iBase,...(Tag==='textarea'?{resize:'none'}:{}),...(props.style||{})}}
        onFocus={e=>{e.target.style.borderColor='rgba(244,98,31,0.5)';e.target.style.boxShadow='0 0 16px rgba(244,98,31,0.12)'}}
        onBlur={e=>{e.target.style.borderColor='rgba(244,98,31,0.12)';e.target.style.boxShadow='none'}}
      />
    </div>
  )
}

export default function Contact() {
  const [form,setForm] = useState({name:'',email:'',subject:'',message:''})
  const [loading,setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    if (!form.name||!form.email||!form.message) { toast.error('Fill all required fields.'); return }
    setLoading(true)
    try {
      await sendMessage(form)
      toast.success("Message sent! I'll get back to you soon.")
      setForm({name:'',email:'',subject:'',message:''})
    } catch(err) {
      toast.error(err.response?.data?.message||'Failed. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <PageTransition>
      <div className="container-custom section-padding relative z-10">

        {/* Header */}
        <motion.div {...f(0)} style={{marginBottom:'4rem',textAlign:'center'}}>
          <div className="eyebrow" style={{justifyContent:'center',marginBottom:'1rem'}}>&lt;/&gt; Let's Connect</div>
          <h1 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'clamp(3rem,7vw,6rem)',fontWeight:900,lineHeight:0.95,marginBottom:'1rem'}}>
            GET IN <span style={{background:'linear-gradient(90deg,var(--fire),var(--fire-bright))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>TOUCH</span>
          </h1>
          <p style={{color:'var(--text-secondary)',maxWidth:'440px',margin:'0 auto',fontSize:'0.95rem'}}>
            Open for MERN Stack Internships, Junior Developer roles, and freelance projects. Let's build something great.
          </p>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'3.5rem',alignItems:'start',marginBottom:'5rem'}}>

          {/* Left */}
          <div style={{display:'flex',flexDirection:'column',gap:'2rem'}}>
            <motion.div {...f(0.1)}>
              <h2 style={{fontSize:'1.25rem',fontWeight:800,color:'#fff',marginBottom:'0.75rem'}}>Let's discuss your next project.</h2>
              <p style={{fontSize:'0.875rem',color:'var(--text-secondary)',lineHeight:1.8}}>
                Whether you need a full-stack MERN application, a React frontend, or scalable backend APIs — I'm ready to deliver clean, tested, and production-ready solutions.
              </p>
            </motion.div>

            {/* Contact cards */}
            <motion.div {...f(0.15)} style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              {[
                {icon:Mail,   label:'EMAIL',    v:profile.email,   href:`mailto:${profile.email}`},
                {icon:Phone,  label:'PHONE',    v:profile.phone,   href:`tel:${profile.phone.replace(/\s/g,'')}`},
                {icon:MapPin, label:'LOCATION', v:profile.location,href:null},
              ].map(({icon:Icon,label,v,href},i)=>{
                const card = (
                  <GlassCard key={i} style={{padding:'1rem 1.25rem',display:'flex',alignItems:'center',gap:'1rem'}}>
                    <div style={{width:'2.5rem',height:'2.5rem',borderRadius:'0.6rem',background:'rgba(244,98,31,0.1)',border:'1px solid rgba(244,98,31,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--fire)',flexShrink:0}}>
                      <Icon size={16}/>
                    </div>
                    <div>
                      <p style={{fontSize:'0.58rem',fontWeight:700,letterSpacing:'0.1em',color:'var(--text-muted)',textTransform:'uppercase',marginBottom:'0.15rem'}}>{label}</p>
                      <p style={{fontSize:'0.83rem',fontWeight:600,color:'#fff',wordBreak:'break-word'}}>{v}</p>
                    </div>
                  </GlassCard>
                )
                return href
                  ? <a key={i} href={href} style={{display:'block',textDecoration:'none'}}>{card}</a>
                  : <div key={i}>{card}</div>
              })}
            </motion.div>

            {/* Socials */}
            <motion.div {...f(0.2)}>
              <p style={{fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'0.75rem'}}>Find Me Online</p>
              <div style={{display:'flex',gap:'0.6rem'}}>
                {[
                  {icon:Github,       href:profile.social.github,  title:'GitHub'},
                  {icon:Linkedin,     href:profile.social.linkedin, title:'LinkedIn'},
                  {icon:MessageCircle,href:profile.whatsapp,        title:'WhatsApp'},
                ].map(({icon:Icon,href,title},i)=>(
                  <a key={i} href={href} target="_blank" rel="noreferrer" className="social-btn" title={title}><Icon size={16}/></a>
                ))}
              </div>
            </motion.div>

            {/* WhatsApp primary CTA */}
            <motion.div {...f(0.25)}>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn-fire" style={{width:'100%',justifyContent:'center'}}>
                <MessageCircle size={16}/> Message on WhatsApp <ArrowUpRight size={14}/>
              </a>
            </motion.div>
          </div>

          {/* Right form */}
          <motion.div {...f(0.15)}>
            <GlassCard style={{padding:'2rem',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',bottom:0,right:0,width:'220px',height:'220px',background:'radial-gradient(circle,rgba(244,98,31,0.06) 0%,transparent 70%)',pointerEvents:'none'}}/>
              <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:'1.25rem',position:'relative'}}>
                <div>
                  <h3 style={{fontSize:'1.2rem',fontWeight:800,color:'#fff',marginBottom:'0.2rem'}}>Send a Message</h3>
                  <p style={{fontSize:'0.72rem',color:'var(--text-secondary)'}}>Required fields marked with *</p>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                  <Field label="Name" required type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                  <Field label="Email" required type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                </div>
                <Field label="Subject" type="text" placeholder="Internship / Freelance / Collaboration" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/>
                <Field as="textarea" label="Message" required rows={5} placeholder="Hey Vinayak, let's build something..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                <motion.button type="submit" disabled={loading}
                  whileHover={{scale:1.02,boxShadow:'0 0 28px rgba(244,98,31,0.4)'}}
                  whileTap={{scale:0.97}}
                  style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',padding:'0.9rem',borderRadius:'100px',background:loading?'var(--fire-dim)':'var(--fire)',color:'#fff',fontWeight:700,fontSize:'0.9rem',border:'none',cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1,transition:'background 0.2s'}}
                >
                  {loading
                    ? <><svg style={{animation:'spin-slow 1s linear infinite',width:'16px',height:'16px'}} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{opacity:0.25}}/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" style={{opacity:0.75}}/></svg>Sending...</>
                    : <><Send size={16}/> Send Message <ArrowUpRight size={14}/></>
                  }
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div {...f(0.1)} style={{position:'relative',borderRadius:'1.5rem',overflow:'hidden',padding:'4rem 2rem',textAlign:'center',border:'1px solid rgba(244,98,31,0.15)'}}>
          <div style={{position:'absolute',inset:0,zIndex:0}}>
            <img src="/assets/cosmic-6.png" alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.15}} onError={e=>e.target.style.display='none'}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(2,1,6,0.95) 0%,rgba(2,1,6,0.6) 100%)'}}/>
          </div>
          <div style={{position:'relative',zIndex:1}}>
            <img src="/assets/profile.jpg" alt="Vinayak" style={{width:'5rem',height:'5rem',borderRadius:'50%',objectFit:'cover',border:'2px solid rgba(244,98,31,0.4)',margin:'0 auto 1.5rem',boxShadow:'0 0 20px rgba(244,98,31,0.3)'}} onError={e=>e.target.style.display='none'}/>
            <h2 style={{fontFamily:"'Barlow Condensed','Inter',sans-serif",fontSize:'clamp(2.5rem,6vw,5rem)',fontWeight:900,color:'#fff',marginBottom:'2rem',lineHeight:0.95}}>
              HAVE ANY PROJECT<br/>IN MIND?
            </h2>
            <div style={{display:'flex',justifyContent:'center',gap:'1rem',flexWrap:'wrap'}}>
              <a href={`mailto:${profile.email}`} className="btn-fire"><Send size={15}/> Send Email <ArrowUpRight size={14}/></a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost"><MessageCircle size={15}/> {profile.phone}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
