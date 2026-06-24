import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, Sparkles, FileText, MessageSquare, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/skills', label: 'Skills', icon: Sparkles },
  { to: '/admin/blogs', label: 'Blogs', icon: FileText },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
]

export default function AdminLayout() {
  const logout = useAuthStore((s) => s.logout)
  const admin = useAuthStore((s) => s.admin)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-dark-primary text-primary">
      <aside className="w-64 bg-dark-secondary border-r border-white/[0.08] flex flex-col p-5">
        <div className="font-display text-xl font-bold mb-8 px-2">
          Vinayak<span style={{color:"var(--fire)"}}>.</span> <span className="text-xs text-secondary font-normal ml-1">Admin</span>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-orange text-white shadow-[0_0_15px_rgba(244,98,31,0.3)]' 
                    : 'text-secondary hover:bg-white/[0.05] hover:text-white'
                }`
              }
            >
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/[0.08] pt-4">
          <div className="text-xs text-secondary px-3.5 mb-3 font-mono truncate">{admin?.email}</div>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-orange hover:bg-orange/10 transition-colors w-full"
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto bg-dark-primary">
        <Outlet />
      </main>
    </div>
  )
}
