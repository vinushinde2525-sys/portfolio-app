import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProgressBar from '../components/ui/ProgressBar'

describe('ProgressBar', () => {
  it('renders label and value', () => {
    render(<ProgressBar label="React.js" value={90} />)
    expect(screen.getByText('React.js')).toBeInTheDocument()
    expect(screen.getByText('90%')).toBeInTheDocument()
  })

  it('renders different skill correctly', () => {
    render(<ProgressBar label="Node.js" value={75} />)
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
  })
})
