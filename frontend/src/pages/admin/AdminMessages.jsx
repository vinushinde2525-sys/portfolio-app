import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Trash2, Mail, MailOpen } from 'lucide-react'
import { getMessages, markMessageRead, deleteMessage } from '../../utils/api'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])

  const load = () => getMessages().then((res) => setMessages(res.data.messages || res.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleRead = async (id) => {
    try { await markMessageRead(id); load() } catch {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await deleteMessage(id)
      toast.success('Message deleted')
      load()
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-1 text-primary">Messages</h1>
      <p className="text-xs text-secondary mb-8">Messages from your contact form</p>

      <div className="space-y-3">
        {messages.length === 0 && <p className="text-sm text-secondary">No messages yet.</p>}
        {messages.map((m) => (
          <div key={m._id} className={`glass-card p-5 hover:border-white/[0.12] transition-colors ${!m.read ? 'border-orange/40 shadow-[0_0_15px_rgba(244,98,31,0.08)] bg-orange/[0.01]' : ''}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {m.read ? <MailOpen size={14} className="text-secondary" /> : <Mail size={14} className="text-red shadow-[0_0_8px_rgba(244,98,31,0.2)]" />}
                <span className="font-bold text-sm text-primary">{m.name}</span>
                <span className="text-xs text-secondary font-mono">{m.email}</span>
              </div>
              <div className="flex gap-2 items-center">
                {!m.read && (
                  <button 
                    onClick={() => handleRead(m._id)} 
                    className="text-xs text-orange hover:underline font-bold"
                  >
                    Mark Read
                  </button>
                )}
                <button onClick={() => handleDelete(m._id)} className="text-secondary hover:text-orange transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            {m.subject && <div className="text-xs font-bold text-orange mb-1">{m.subject}</div>}
            <p className="text-sm text-secondary leading-relaxed">{m.message}</p>
            <div className="text-[10px] text-secondary/60 mt-3 font-mono">{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
