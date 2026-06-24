import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-center px-6">
      <div className="font-display text-7xl font-extrabold text-brand-brown mb-2">404</div>
      <p className="text-brand-muted mb-6">Page not found. The link you followed may be broken.</p>
      <Link to="/" className="btn-warm">Go Home</Link>
    </div>
  )
}
