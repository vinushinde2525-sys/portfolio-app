import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Briefcase, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import SectionTitle from '../ui/SectionTitle'
import { profile } from '../../utils/portfolioData'
import { sendMessage } from '../../utils/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await sendMessage(form)
      toast.success('Message sent! I will get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-brand-brown text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: 'radial-gradient(circle at 80% 20%, #F4A261, transparent 50%)'
      }} />
      <div className="container-custom grid md:grid-cols-2 gap-14 relative z-10">
        <div>
          <span className="eyebrow text-brand-gold">
            <span className="block w-5 h-px bg-brand-gold" /> Contact
          </span>
          <h2 className="font-display text-display-md font-extrabold mt-3 text-balance">
            Let's Build Something <em className="text-brand-gold not-italic">Amazing.</em>
          </h2>
          <p className="text-white/70 mt-4 max-w-md leading-relaxed">
            Open for full-time opportunities, freelance projects, and collaborations. Let's create something great together.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center"><Mail size={18} /></div>
              <div>
                <div className="text-xs text-white/50 font-semibold">Email</div>
                <div className="text-sm font-semibold">{profile.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center"><MapPin size={18} /></div>
              <div>
                <div className="text-xs text-white/50 font-semibold">Location</div>
                <div className="text-sm font-semibold">{profile.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center"><Briefcase size={18} /></div>
              <div>
                <div className="text-xs text-white/50 font-semibold">Availability</div>
                <div className="text-sm font-semibold">Open to Full-Time & Freelance</div>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white/8 border border-white/15 rounded-2xl p-7 backdrop-blur-md"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-white/70 mb-1.5 block">Your Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 placeholder-white/35 text-sm outline-none focus:border-brand-gold transition-colors"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-200 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-white/70 mb-1.5 block">Email Address</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 placeholder-white/35 text-sm outline-none focus:border-brand-gold transition-colors"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-xs text-red-200 mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-white/70 mb-1.5 block">Subject</label>
            <input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 placeholder-white/35 text-sm outline-none focus:border-brand-gold transition-colors"
              placeholder="Job Opportunity / Collaboration"
            />
          </div>
          <div className="mb-5">
            <label className="text-xs font-semibold text-white/70 mb-1.5 block">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 placeholder-white/35 text-sm outline-none focus:border-brand-gold transition-colors resize-none"
              placeholder="Tell me about the opportunity..."
            />
            {errors.message && <p className="text-xs text-red-200 mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-gold text-brand-text font-bold text-sm hover:bg-[#f0903a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? 'Sending...' : 'Send Message'} <Send size={15} />
          </button>
        </motion.form>
      </div>
    </section>
  )
}
