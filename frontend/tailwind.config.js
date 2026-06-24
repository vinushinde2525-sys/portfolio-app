/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Barlow Condensed'", "'Inter'", 'sans-serif'],
        body: ["'Inter'", 'system-ui', 'sans-serif'],
      },
      colors: {
        fire:         'var(--fire)',
        'fire-bright':'var(--fire-bright)',
        'fire-dim':   'var(--fire-dim)',
        void:         'var(--bg-void)',
        deep:         'var(--bg-deep)',
      },
      boxShadow: {
        'glow-fire': '0 0 40px rgba(244,98,31,0.35)',
        'glow-soft': '0 0 20px rgba(244,98,31,0.2)',
      },
      animation: {
        float:        'float-y 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'spin-slow':  'spin-slow 8s linear infinite',
        'ring-pulse': 'ring-pulse 3s ease-in-out infinite',
        shimmer:      'shimmer 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
