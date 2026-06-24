import { describe, it, expect } from 'vitest'
import { render, container } from '@testing-library/react'
import SkeletonCard from '../components/ui/SkeletonCard'

describe('SkeletonCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<SkeletonCard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('contains skeleton elements', () => {
    const { container } = render(<SkeletonCard />)
    const skeletons = container.querySelectorAll('.skeleton')
    expect(skeletons.length).toBeGreaterThan(0)
  })
})
