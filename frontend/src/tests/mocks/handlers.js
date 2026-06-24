import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/projects', () =>
    HttpResponse.json([
      {
        _id: 'p1',
        title: '3D Café Platform',
        description: 'Full-stack food ordering platform',
        category: 'fullstack',
        featured: true,
        tags: ['React', 'Node.js', 'MongoDB'],
        github: 'https://github.com/test',
        live: 'https://test.com',
      },
      {
        _id: 'p2',
        title: 'Grilli Restaurant',
        description: 'Fine dining reservation platform',
        category: 'fullstack',
        featured: true,
        tags: ['React', 'Express'],
        github: 'https://github.com/test2',
        live: 'https://test2.com',
      },
    ])
  ),
  http.get('/api/skills', () =>
    HttpResponse.json([
      { _id: 's1', name: 'React', level: 90, category: 'Frontend' },
      { _id: 's2', name: 'Node.js', level: 85, category: 'Backend' },
    ])
  ),
  http.post('/api/contact', () =>
    HttpResponse.json({ message: 'Message sent successfully' }, { status: 201 })
  ),
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json()
    if (body.email === 'admin@test.com' && body.password === 'password') {
      return HttpResponse.json({ token: 'mock-jwt-token', admin: { email: body.email } })
    }
    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }),
  http.get('/api/health', () =>
    HttpResponse.json({ status: 'ok', time: new Date().toISOString() })
  ),
]
