import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, Pencil, X } from 'lucide-react'
import { getProjects, createProject, updateProject, deleteProject } from '../../utils/api'

const EMPTY = { title: '', description: '', category: 'fullstack', tags: '', github: '', live: '' }

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => getProjects().then((res) => setProjects(res.data.projects || res.data)).catch(() => {})

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) }
    try {
      if (editingId) {
        await updateProject(editingId, payload)
        toast.success('Project updated')
      } else {
        await createProject(payload)
        toast.success('Project created')
      }
      setForm(EMPTY)
      setEditingId(null)
      setShowForm(false)
      load()
    } catch {
      toast.error('Failed to save project')
    }
  }

  const handleEdit = (p) => {
    setForm({ ...p, tags: (p.tags || []).join(', ') })
    setEditingId(p._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await deleteProject(id)
      toast.success('Project deleted')
      load()
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black mb-1 text-primary">Projects</h1>
          <p className="text-xs text-secondary">Manage your portfolio projects</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setEditingId(null); setShowForm(true) }} className="btn-red">
          <Plus size={16} /> New Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card p-6 mb-8 relative">
          <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-secondary hover:text-white transition-colors">
            <X size={18} />
          </button>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input 
              required 
              placeholder="Title" 
              value={form.title} 
              onChange={(e) => setForm({ ...form, title: e.target.value })} 
              className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v" 
            />
            <select 
              value={form.category} 
              onChange={(e) => setForm({ ...form, category: e.target.value })} 
              className="px-4 py-3 bg-dark-secondary border border-white/10 rounded-lg text-sm outline-none focus:border-orange text-primary"
            >
              <option value="fullstack">Full Stack</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
            </select>
          </div>
          <textarea 
            required 
            placeholder="Description" 
            rows={3} 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v mb-4 resize-none" 
          />
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input 
              placeholder="GitHub URL" 
              value={form.github} 
              onChange={(e) => setForm({ ...form, github: e.target.value })} 
              className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v" 
            />
            <input 
              placeholder="Live Demo URL" 
              value={form.live} 
              onChange={(e) => setForm({ ...form, live: e.target.value })} 
              className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v" 
            />
          </div>
          <input 
            placeholder="Tags (comma separated)" 
            value={form.tags} 
            onChange={(e) => setForm({ ...form, tags: e.target.value })} 
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v mb-5" 
          />
          <button type="submit" className="btn-red">{editingId ? 'Update Project' : 'Create Project'}</button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <div key={p._id} className="glass-card p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-sm text-primary">{p.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(p)} className="text-secondary hover:text-white transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="text-secondary hover:text-orange transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-secondary mb-4 line-clamp-3 leading-relaxed">{p.description}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
              {(p.tags || []).map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-secondary font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
