import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

// ── Request interceptor — attach JWT ──────────────────────────
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('adminToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  err => Promise.reject(err)
)

// ── Response interceptor — handle 401 ────────────────────────
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      const isAdminRoute = window.location.pathname.startsWith('/admin')
      if (isAdminRoute && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('adminToken')
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(err)
  }
)

// ── Public endpoints ──────────────────────────────────────────
export const getProjects   = ()       => api.get('/projects')
export const getProject    = (id)     => api.get(`/projects/${id}`)
export const getSkills     = ()       => api.get('/skills')
export const getBlogs      = ()       => api.get('/blogs')
export const getBlog       = (id)     => api.get(`/blogs/${id}`)
export const sendMessage   = (data)   => api.post('/contact', data)
export const trackVisit    = (data)   => api.post('/analytics/visit', data)

// ── Auth endpoints ────────────────────────────────────────────
export const login  = (creds) => api.post('/auth/login', creds)
export const getMe  = ()      => api.get('/auth/me')

// ── Admin endpoints ───────────────────────────────────────────
export const getAdminStats      = ()         => api.get('/admin/stats')
export const getAdminProjects   = ()         => api.get('/admin/projects')
export const createProject      = (data)     => api.post('/admin/projects', data)
export const updateProject      = (id, data) => api.put(`/admin/projects/${id}`, data)
export const deleteProject      = (id)       => api.delete(`/admin/projects/${id}`)
export const getAdminSkills     = ()         => api.get('/admin/skills')
export const createSkill        = (data)     => api.post('/admin/skills', data)
export const updateSkill        = (id, data) => api.put(`/admin/skills/${id}`, data)
export const deleteSkill        = (id)       => api.delete(`/admin/skills/${id}`)
export const getAdminBlogs      = ()         => api.get('/admin/blogs')
export const createBlog         = (data)     => api.post('/admin/blogs', data)
export const updateBlog         = (id, data) => api.put(`/admin/blogs/${id}`, data)
export const deleteBlog         = (id)       => api.delete(`/admin/blogs/${id}`)
export const getMessages        = ()         => api.get('/admin/messages')
export const updateMessage      = (id, data) => api.patch(`/admin/messages/${id}`, data)
export const deleteMessage      = (id)       => api.delete(`/admin/messages/${id}`)

export default api

// ── Aliases expected by admin pages ──────────────────────────
export const getDashboardStats = getAdminStats
export const adminLogin        = login
export const markMessageRead   = (id) => updateMessage(id, { read: true })
