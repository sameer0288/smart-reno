import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-deep': 'var(--bg-deep)',
        'bg-card': 'var(--bg-card)',
        'fg-main': 'var(--fg-main)',
        'fg-muted': 'var(--fg-muted)',
        'accent-blue': 'var(--accent-blue)',
        'accent-electric': 'var(--accent-electric)',
        'accent-purple': 'var(--accent-purple)',
        'border-glass': 'var(--border-glass)',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
