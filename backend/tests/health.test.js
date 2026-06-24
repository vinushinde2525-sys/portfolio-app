import request from 'supertest'
import app from '../src/app.js'

describe('Health & Core Routes', () => {
  it('GET /api/health returns 200 with ok status', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
    expect(res.body.time).toBeDefined()
    expect(typeof res.body.uptime).toBe('number')
  })

  it('GET /api/health returns env field', async () => {
    const res = await request(app).get('/api/health')
    expect(res.body.env).toBeDefined()
  })

  it('GET /api/nonexistent returns 404', async () => {
    const res = await request(app).get('/api/nonexistent-route-xyz')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Route not found')
  })

  it('GET / returns 404 (API server only)', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(404)
  })

  it('Response has JSON content type', async () => {
    const res = await request(app).get('/api/health')
    expect(res.headers['content-type']).toMatch(/json/)
  })
})
