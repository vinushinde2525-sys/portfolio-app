import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, X } from 'lucide-react'
import { getBlogs, createBlog, deleteBlog } from '../../utils/api'

const EMPTY = { title: '', content: '', category: 'Tech', tags: '' }

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [showForm, setShowForm] = useState(false)

  const load = () => getBlogs().then((res) => setBlogs(res.data.blogs || res.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createBlog({ ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) })
      toast.success('Blog post created')
      setForm(EMPTY)
      setShowForm(false)
      load()
    } catch {
      toast.error('Failed to create post')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await deleteBlog(id)
      toast.success('Post deleted')
      load()
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black mb-1 text-primary">Blog Posts</h1>
          <p className="text-xs text-secondary">Manage your blog content</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-red"><Plus size={16} /> New Post</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card p-6 mb-8 relative">
          <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-secondary hover:text-white transition-colors">
            <X size={18} />
          </button>
          <input 
            required 
            placeholder="Title" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v mb-4" 
          />
          <textarea 
            required 
            placeholder="Content" 
            rows={6} 
            value={form.content} 
            onChange={(e) => setForm({ ...form, content: e.target.value })} 
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v mb-4 resize-none" 
          />
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <input 
              placeholder="Category" 
              value={form.category} 
              onChange={(e) => setForm({ ...form, category: e.target.value })} 
              className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v" 
            />
            <input 
              placeholder="Tags (comma separated)" 
              value={form.tags} 
              onChange={(e) => setForm({ ...form, tags: e.target.value })} 
              className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm outline-none focus:border-orange focus:shadow-[0_0_12px_rgba(244,98,31,0.2)] text-primary placeholder:text-muted-v" 
            />
          </div>
          <button type="submit" className="btn-red">Publish Post</button>
        </form>
      )}

      <div className="space-y-3">
        {blogs.map((b) => (
          <div key={b._id} className="glass-card p-5 flex items-center justify-between hover:border-white/[0.12] transition-colors">
            <div>
              <div className="font-bold text-sm text-primary">{b.title}</div>
              <div className="text-xs text-secondary mt-0.5 font-mono">{b.category} · {b.views || 0} views</div>
            </div>
            <button onClick={() => handleDelete(b._id)} className="text-secondary hover:text-orange transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
