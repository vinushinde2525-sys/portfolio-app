import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { server } from './mocks/server.js'
import Projects from '../pages/Projects'

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

vi.mock('../utils/api', () => ({
  getProjects: vi.fn().mockResolvedValue({
    data: [
      { _id:'p1', title:'3D Café', description:'Full stack', category:'fullstack', featured:true, tags:['React'], github:'https://github.com/test', live:'https://test.com', image:'' },
      { _id:'p2', title:'Grilli', description:'Restaurant', category:'fullstack', featured:true, tags:['Node'], github:'https://github.com/test2', live:'https://test2.com', image:'' },
      { _id:'p3', title:'Tourly', description:'Travel', category:'frontend', featured:false, tags:['React'], github:'https://github.com/test3', live:'https://test3.com', image:'' },
    ],
  }),
}))

const wrap = (ui) =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </MemoryRouter>
  )

describe('Projects page', () => {
  it('renders MY PROJECTS heading', async () => {
    wrap(<Projects />)
    await waitFor(() => expect(screen.getByText(/MY/i)).toBeInTheDocument())
  })

  it('renders featured project cards after load', async () => {
    wrap(<Projects />)
    await waitFor(() => {
      expect(screen.getByText('3D Café')).toBeInTheDocument()
      expect(screen.getByText('Grilli')).toBeInTheDocument()
    })
  })

  it('renders live demo links', async () => {
    wrap(<Projects />)
    await waitFor(() => {
      const demoLinks = screen.getAllByText(/Live Demo/i)
      expect(demoLinks.length).toBeGreaterThan(0)
    })
  })

  it('renders github links', async () => {
    wrap(<Projects />)
    await waitFor(() => {
      const githubLinks = screen.getAllByText(/GitHub|Source/i)
      expect(githubLinks.length).toBeGreaterThan(0)
    })
  })
})
