import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import GlassCard from '../components/ui/GlassCard'

describe('GlassCard', () => {
  it('renders children', () => {
    render(<GlassCard><span>Card Content</span></GlassCard>)
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<GlassCard className="custom-class"><span>test</span></GlassCard>)
    const card = screen.getByText('test').closest('.cosmic-card')
    expect(card).toHaveClass('custom-class')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<GlassCard onClick={onClick}><span>Click me</span></GlassCard>)
    fireEvent.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
