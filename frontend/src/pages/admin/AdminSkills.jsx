import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, X } from 'lucide-react'
import { getSkills, createSkill, deleteSkill } from '../../utils/api'

const EMPTY = { name: '', category: 'Frontend', level: 80 }

export default function AdminSkills() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [showForm, setShowForm] = useState(false)

  const load = () => getSkills().then((res) => setSkills(res.data.skills || res.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createSkill(form)
      toast.success('Skill added')
      setForm(EMPTY)
      setShowForm(false)
      load()
    } catch {
      toast.error('Failed to add skill')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    try {
      await deleteSkill(id)
      toast.success('Skill deleted')
      load()
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black mb-1 text-primary">Skills</h1>
          <p className="text-xs text-secondary">Manage your skill set</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-red"><Plus size={16} /> Add Skill</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card p-6 mb-8 relative grid sm:grid-cols-4 gap-4 items-end">
          <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-secondary hover:text-white transition-colors">
            <X size={18} />
          </button>
          <input 
            required 
            placeholder="Skill name" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
            className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v" 
          />
          <select 
            value={form.category} 
            onChange={(e) => setForm({ ...form, category: e.target.value })} 
            className="px-4 py-3 bg-dark-secondary border border-white/10 rounded-lg text-sm outline-none focus:border-orange text-primary"
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>Tools</option>
          </select>
          <input 
            type="number" 
            min="0" 
            max="100" 
            placeholder="Level %" 
            value={form.level} 
            onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} 
            className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v" 
          />
          <button type="submit" className="btn-red justify-center">Add</button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((s) => (
          <div key={s._id} className="glass-card p-5 relative">
            <button onClick={() => handleDelete(s._id)} className="absolute top-3 right-3 text-secondary hover:text-orange transition-colors">
              <Trash2 size={14} />
            </button>
            <div className="text-[10px] text-orange font-extrabold uppercase tracking-wider mb-1">{s.category}</div>
            <div className="font-bold text-sm mb-3 text-primary">{s.name}</div>
            <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-red to-blue" 
                style={{ width: `${s.level}%`, boxShadow: '0 0 6px rgba(59,130,246,0.3)' }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
