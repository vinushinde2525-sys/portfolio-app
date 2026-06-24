import '@testing-library/jest-dom'
import { vi } from 'vitest'

// ── Suppress known non-critical warnings ────────────────────
const originalWarn = console.warn
console.warn = (...args) => {
  const msg = typeof args[0] === 'string' ? args[0] : ''
  // Suppress localStorage experimental warning (Node jsdom limitation)
  if (msg.includes('localStorage') || msg.includes('ExperimentalWarning')) return
  // Suppress framer-motion ref warnings in test env
  if (msg.includes('PopChild') || msg.includes('forwardRef')) return
  originalWarn(...args)
}

const originalError = console.error
console.error = (...args) => {
  const msg = typeof args[0] === 'string' ? args[0] : ''
  // Suppress React act() warnings in test env
  if (msg.includes('Warning: An update to') && msg.includes('act(')) return
  originalError(...args)
}

// ── Mock ResizeObserver ────────────────────────────────────
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// ── Mock IntersectionObserver ──────────────────────────────
global.IntersectionObserver = vi.fn().mockImplementation((cb) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}))

// ── Mock WebGL for Three.js ───────────────────────────────
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  fillRect: vi.fn(), clearRect: vi.fn(),
  getImageData: vi.fn(() => ({ data: new Array(4) })),
  putImageData: vi.fn(), createImageData: vi.fn(() => []),
  setTransform: vi.fn(), drawImage: vi.fn(),
  save: vi.fn(), fillText: vi.fn(), restore: vi.fn(),
  beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(),
  closePath: vi.fn(), stroke: vi.fn(), translate: vi.fn(),
  scale: vi.fn(), rotate: vi.fn(), arc: vi.fn(),
  fill: vi.fn(), measureText: vi.fn(() => ({ width: 0 })),
  transform: vi.fn(), rect: vi.fn(), clip: vi.fn(),
  canvas: { width: 0, height: 0 },
}))

// ── Mock window.scrollTo ───────────────────────────────────
global.scrollTo = vi.fn()

// ── Mock localStorage ──────────────────────────────────────
const localStorageMock = (() => {
  let store = {}
  return {
    getItem:    (key) => store[key] ?? null,
    setItem:    (key, val) => { store[key] = String(val) },
    removeItem: (key) => { delete store[key] },
    clear:      () => { store = {} },
    get length() { return Object.keys(store).length },
    key:        (i) => Object.keys(store)[i] ?? null,
  }
})()
Object.defineProperty(global, 'localStorage', { value: localStorageMock, writable: true })

// ── Mock matchMedia ────────────────────────────────────────
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false, media: query, onchange: null,
    addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
