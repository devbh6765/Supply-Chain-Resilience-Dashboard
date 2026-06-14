/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Core dark palette — slate-based with a cold blue-steel tint
        surface: {
          900: '#0b0f1a',  // page background
          800: '#111827',  // sidebar
          700: '#1a2235',  // cards
          600: '#1f2d42',  // card hover / input bg
          500: '#2a3a52',  // borders
        },
        // Accent: cold cyan — deliberate choice for supply chain (cold chain, logistics)
        accent: {
          DEFAULT: '#22d3ee',   // cyan-400
          dim:     '#0e7490',   // cyan-700
          muted:   '#164e63',   // cyan-900
        },
        // Status colors
        ok:      '#10b981',  // emerald-500
        warn:    '#f59e0b',  // amber-500
        danger:  '#ef4444',  // red-500
        info:    '#6366f1',  // indigo-500
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.4)',
        'card-lg': '0 4px 16px 0 rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
