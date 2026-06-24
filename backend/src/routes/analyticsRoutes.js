import express from 'express'
import { trackVisit } from '../controllers/analyticsController.js'

const router = express.Router()

router.post('/visit', trackVisit)

export default router
