import { useEffect, useState } from 'react'
import { Eye, MessageSquare, FolderKanban, FileText } from 'lucide-react'
import { getDashboardStats } from '../../utils/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ visitors: 0, messages: 0, projects: 0, blogViews: 0 })

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
  }, [])

  const cards = [
    { label: 'Total Visitors', value: stats.visitors, icon: Eye },
    { label: 'Messages', value: stats.messages, icon: MessageSquare },
    { label: 'Projects', value: stats.projects, icon: FolderKanban },
    { label: 'Blog Views', value: stats.blogViews, icon: FileText },
  ]

  return (
    <div>
      <h1 className="text-3xl font-black mb-1 text-primary">Dashboard</h1>
      <p className="text-xs text-secondary mb-8">Overview of your portfolio activity</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass-card p-6 flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center mb-4 text-orange shadow-[0_0_15px_rgba(244,98,31,0.1)]">
              <Icon size={18} />
            </div>
            <div className="text-3xl font-black text-primary tracking-tight">{value}</div>
            <div className="text-xs text-secondary mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
