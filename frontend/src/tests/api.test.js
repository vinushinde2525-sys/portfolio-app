import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { server } from './mocks/server.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('API handlers (MSW)', () => {
  it('GET /api/projects returns project array', async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0]).toHaveProperty('title')
    expect(data[0]).toHaveProperty('tags')
  })

  it('GET /api/skills returns skill array', async () => {
    const res = await fetch('/api/skills')
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toHaveProperty('name')
    expect(data[0]).toHaveProperty('level')
  })

  it('POST /api/contact returns 201 on success', async () => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@test.com',
        message: 'Hello from test',
      }),
    })
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.message).toMatch(/sent/i)
  })

  it('POST /api/auth/login returns 401 for wrong creds', async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'wrong@test.com', password: 'wrong' }),
    })
    expect(res.status).toBe(401)
  })

  it('POST /api/auth/login returns token for correct creds', async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@test.com', password: 'password' }),
    })
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.token).toBeDefined()
  })

  it('GET /api/health returns ok status', async () => {
    const res = await fetch('/api/health')
    const data = await res.json()
    expect(data.status).toBe('ok')
  })
})
