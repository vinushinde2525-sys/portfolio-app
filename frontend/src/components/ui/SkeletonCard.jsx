import { forwardRef } from 'react'

const SkeletonCard = forwardRef(function SkeletonCard(_props, ref) {
  return (
    <div ref={ref} className="cosmic-card" style={{ overflow: 'hidden', padding: '1.25rem' }}>
      <div className="skeleton" style={{ height: '180px', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '0.6rem' }} />
      <div className="skeleton" style={{ height: '14px', width: '90%', marginBottom: '0.4rem' }} />
      <div className="skeleton" style={{ height: '14px', width: '60%' }} />
    </div>
  )
})

export default SkeletonCard
