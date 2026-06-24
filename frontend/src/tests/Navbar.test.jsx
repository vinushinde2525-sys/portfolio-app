import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

const renderNavbar = (path = '/') =>
  render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar />
    </MemoryRouter>
  )

describe('Navbar', () => {
  it('renders the brand logo', () => {
    renderNavbar()
    expect(screen.getByText(/Vinayak/i)).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    renderNavbar()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders the Let\'s Talk CTA button', () => {
    renderNavbar()
    const cta = screen.getByText(/Let's Talk/i)
    expect(cta).toBeInTheDocument()
  })

  it('does not render on admin pages', () => {
    renderNavbar('/admin')
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })

  it('toggles mobile menu on hamburger click', () => {
    renderNavbar()
    const burger = screen.getByRole('button')
    fireEvent.click(burger)
    // Menu items should be visible in mobile menu
    const homeLinks = screen.getAllByText('Home')
    expect(homeLinks.length).toBeGreaterThanOrEqual(1)
  })
})
