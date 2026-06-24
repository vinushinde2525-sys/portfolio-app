import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'
import { apiLimiter, loginLimiter } from './middleware/rateLimiter.js'

import authRoutes      from './routes/authRoutes.js'
import projectRoutes   from './routes/projectRoutes.js'
import skillRoutes     from './routes/skillRoutes.js'
import blogRoutes      from './routes/blogRoutes.js'
import contactRoutes   from './routes/contactRoutes.js'
import adminRoutes     from './routes/adminRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'

const app = express()

// ── Trust proxy (Render/Railway) ──────────────────────────────
app.set('trust proxy', 1)

// ── Security headers ──────────────────────────────────────────
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      styleSrc:    ["'self'", "'unsafe-inline'"],
      imgSrc:      ["'self'", 'data:', 'https:'],
      connectSrc:  ["'self'"],
    },
  },
}))

// ── CORS ──────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error(`CORS: Origin ${origin} not allowed`))
  },
  methods:        ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials:    true,
}))

// ── Body parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(mongoSanitize())

// ── Compression ───────────────────────────────────────────────
app.use(compression())

// ── Logging ───────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
}

// ── Rate limiting ─────────────────────────────────────────────
app.use('/api',       apiLimiter)
app.use('/api/auth',  loginLimiter)

// ── Health check ──────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status:  'ok',
    time:    new Date().toISOString(),
    env:     process.env.NODE_ENV || 'development',
    uptime:  Math.floor(process.uptime()),
  })
})

// ── API Routes ────────────────────────────────────────────────
app.use('/api/auth',       authRoutes)
app.use('/api/projects',   projectRoutes)
app.use('/api/skills',     skillRoutes)
app.use('/api/blogs',      blogRoutes)
app.use('/api/contact',    contactRoutes)
app.use('/api/admin',      adminRoutes)
app.use('/api/analytics',  analyticsRoutes)

// ── 404 ───────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Global error handler ──────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const isDev = process.env.NODE_ENV !== 'production'
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: isDev ? err.message : 'Internal server error',
    ...(isDev && { stack: err.stack }),
  })
})

export default app
