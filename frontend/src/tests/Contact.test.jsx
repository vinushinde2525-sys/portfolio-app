import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { server } from './mocks/server.js'
import Contact from '../pages/Contact'

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
  Toaster: () => null,
}))

const renderContact = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Contact />
    </MemoryRouter>
  )

describe('Contact page', () => {
  it('renders GET IN TOUCH heading', () => {
    renderContact()
    expect(screen.getByText(/GET IN/i)).toBeInTheDocument()
  })

  it('renders email input', () => {
    renderContact()
    expect(screen.getByPlaceholderText(/your@email\.com/i)).toBeInTheDocument()
  })

  it('renders name input', () => {
    renderContact()
    expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument()
  })

  it('renders send button', () => {
    renderContact()
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument()
  })

  it('shows error on empty submit', async () => {
    const toast = await import('react-hot-toast')
    renderContact()
    const btn = screen.getByRole('button', { name: /Send Message/i })
    fireEvent.click(btn)
    await waitFor(() => {
      expect(toast.default.error).toHaveBeenCalledWith('Fill all required fields.')
    })
  })

  it('renders WhatsApp CTA link', () => {
    renderContact()
    const waLinks = screen.getAllByTitle('WhatsApp')
    expect(waLinks.length).toBeGreaterThan(0)
  })

  it('renders real email address', () => {
    renderContact()
    expect(screen.getByText('vinushinde2525@gmail.com')).toBeInTheDocument()
  })
})
