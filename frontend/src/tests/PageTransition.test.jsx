import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PageTransition from '../components/layout/PageTransition'

describe('PageTransition', () => {
  it('renders children', () => {
    render(
      <PageTransition>
        <div data-testid="child">Hello</div>
      </PageTransition>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders text content', () => {
    render(
      <PageTransition>
        <p>Test Content</p>
      </PageTransition>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
