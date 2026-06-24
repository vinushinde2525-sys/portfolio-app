import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../src/app.js'

let mongod

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  process.env.MONGO_URI  = mongod.getUri()
  process.env.JWT_SECRET = 'test_jwt_secret_for_ci_testing_only'
  await mongoose.connect(mongod.getUri())
}, 30000)

afterAll(async () => {
  await mongoose.disconnect()
  await mongod.stop()
}, 15000)

describe('Auth Routes', () => {
  it('POST /api/auth/login with empty body returns 400 or 401', async () => {
    const res = await request(app).post('/api/auth/login').send({})
    expect([400, 401, 422]).toContain(res.status)
  })

  it('POST /api/auth/login with wrong credentials returns 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@test.com', password: 'wrongpass' })
    expect(res.status).toBe(401)
  })

  it('GET /api/auth/me without token returns 401', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
    expect(res.body.message).toBeTruthy()
  })

  it('GET /api/auth/me with malformed token returns 401', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer not.a.real.token')
    expect(res.status).toBe(401)
  })

  it('GET /api/auth/me with no Bearer prefix returns 401', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'justtoken')
    expect(res.status).toBe(401)
  })
})
