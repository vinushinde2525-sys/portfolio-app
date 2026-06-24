import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import app from './app.js'


const PORT = process.env.PORT || 10000; // Render uses port 10000 by default if not specified
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// ── Validate required env vars ────────────────────────────────
const REQUIRED = ['MONGO_URI', 'JWT_SECRET']
const missing  = REQUIRED.filter(k => !process.env[k])
if (missing.length && process.env.NODE_ENV !== 'test') {
  console.error(`❌ Missing env vars: ${missing.join(', ')}`)
  process.exit(1)
}

// ── Start ─────────────────────────────────────────────────────
let server

async function start() {
  await connectDB()
  server = app.listen(PORT, () => {
    console.info(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
  })
}

// ── Graceful shutdown ─────────────────────────────────────────
async function shutdown(signal) {
  console.info(`\n⚠️  ${signal} — shutting down...`)
  if (server) server.close()
  await mongoose.connection.close()
  console.info('✅ Server closed')
  process.exit(0)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT',  () => shutdown('SIGINT'))
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason)
  shutdown('unhandledRejection')
})

start()
