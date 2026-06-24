import express from 'express'
import { protect } from '../middleware/auth.js'
import { getDashboardStats } from '../controllers/analyticsController.js'
import { createProject, updateProject, deleteProject } from '../controllers/projectController.js'
import { createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js'
import { createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js'
import { getMessages, markMessageRead, deleteMessage } from '../controllers/messageController.js'

const router = express.Router()

router.use(protect) // everything below requires a valid admin JWT

router.get('/stats', getDashboardStats)

router.post('/projects', createProject)
router.put('/projects/:id', updateProject)
router.delete('/projects/:id', deleteProject)

router.post('/skills', createSkill)
router.put('/skills/:id', updateSkill)
router.delete('/skills/:id', deleteSkill)

router.post('/blogs', createBlog)
router.put('/blogs/:id', updateBlog)
router.delete('/blogs/:id', deleteBlog)

router.get('/messages', getMessages)
router.patch('/messages/:id/read', markMessageRead)
router.delete('/messages/:id', deleteMessage)

export default router
