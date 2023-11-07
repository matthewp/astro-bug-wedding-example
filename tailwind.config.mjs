import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        'sparkle-spin': 'spinning 2000ms linear',
        'sparkle-come-in-out': 'comeInOut 1400ms forwards'
      },
      keyframes: {
        spinning: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' }
        },
        comeInOut: {
          '0%, 100%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' }
        }
      }
    }
  },
  plugins: []
}
