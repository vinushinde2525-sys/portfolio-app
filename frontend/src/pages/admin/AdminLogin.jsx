import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Lock } from 'lucide-react'
import { adminLogin } from '../../utils/api'
import { useAuthStore } from '../../store/authStore'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await adminLogin(form)
      login(data.token, data.admin)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-primary px-6">
      <form onSubmit={handleSubmit} className="glass-card p-8 w-full max-w-sm relative overflow-hidden">
        {/* Decorative subtle gradient */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at bottom right, var(--fire) 0%, transparent 70%)'
          }}
        />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center mb-5 text-orange shadow-[0_0_15px_rgba(244,98,31,0.15)]">
            <Lock size={20} />
          </div>
          <h1 className="font-display text-2xl font-black mb-1 text-primary">Admin Login</h1>
          <p className="text-xs text-secondary mb-6">Sign in to manage your portfolio</p>

          <label className="text-xs font-bold uppercase tracking-wider text-secondary mb-1.5 block">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary transition-all duration-300 placeholder:text-muted-v mb-4"
            placeholder="admin@example.com"
          />

          <label className="text-xs font-bold uppercase tracking-wider text-secondary mb-1.5 block">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary transition-all duration-300 placeholder:text-muted-v mb-6"
            placeholder="••••••••"
          />

          <button 
            type="submit" 
            disabled={loading} 
            className="btn-red w-full justify-center disabled:opacity-60 py-3"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  )
}
