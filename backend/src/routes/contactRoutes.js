import express from 'express'
import { createMessage } from '../controllers/messageController.js'
import { contactLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.post('/', contactLimiter, createMessage)

export default router
