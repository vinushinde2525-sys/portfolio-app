import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

vi.mock('../components/three/GlobalCanvas', () => ({ default: () => null }))

const wrap = (ui) =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </MemoryRouter>
  )

describe('HomePage', () => {
  it('renders VINAYAK heading', () => {
    wrap(<HomePage />)
    expect(screen.getByText('VINAYAK')).toBeInTheDocument()
  })

  it('renders SHINDE. heading', () => {
    wrap(<HomePage />)
    expect(screen.getByText('SHINDE.')).toBeInTheDocument()
  })

  it('renders View My Work link', () => {
    wrap(<HomePage />)
    expect(screen.getByText(/View My Work/i)).toBeInTheDocument()
  })

  it('renders View Resume link', () => {
    wrap(<HomePage />)
    expect(screen.getByText(/View Resume/i)).toBeInTheDocument()
  })

  it('renders MERN STACK DEVELOPER tag', () => {
    wrap(<HomePage />)
    // Use getAllByText since text may appear in multiple elements (hero + about teaser)
    const matches = screen.getAllByText(/MERN STACK DEVELOPER/i)
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('renders stat items', () => {
    wrap(<HomePage />)
    expect(screen.getByText(/Projects Built/i)).toBeInTheDocument()
  })

  it('renders Connect label', () => {
    wrap(<HomePage />)
    expect(screen.getByText(/Connect/i)).toBeInTheDocument()
  })
})
