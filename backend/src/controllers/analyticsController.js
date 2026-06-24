import Visitor from '../models/Visitor.js'
import Message from '../models/Message.js'
import Project from '../models/Project.js'
import Blog from '../models/Blog.js'

export const trackVisit = async (req, res, next) => {
  try {
    await Visitor.create({
      ip: req.ip,
      userAgent: req.headers['user-agent'] || '',
      page: req.body.page || '/',
      referrer: req.headers.referer || '',
    })
    res.status(201).json({ tracked: true })
  } catch (err) {
    next(err)
  }
}

export const getDashboardStats = async (req, res, next) => {
  try {
    const [visitors, messages, projects, blogs] = await Promise.all([
      Visitor.countDocuments(),
      Message.countDocuments(),
      Project.countDocuments(),
      Blog.find().select('views'),
    ])
    const blogViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0)
    res.json({ visitors, messages, projects, blogViews })
  } catch (err) {
    next(err)
  }
}
