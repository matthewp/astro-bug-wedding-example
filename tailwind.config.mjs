/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'sparkle-spin': 'spinning 2000ms linear',
        'sparkle-come-in-out': 'comeInOut 1400ms forwards',
        dance: 'dance 600ms infinite 200ms',
        wiggle: 'wiggle 1.25s linear infinite alternate',
        'wiggle-delay': 'wiggle 1s linear infinite alternate 500ms'
      },
      colors: {
        'custom-pink': '#FFB0B0',
        'custom-green': '#005E4A',
        'custom-red': '#FF0000',
        'custom-bg-pink': '#FFB5B1'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        sacramento: ['Sacramento', 'sans-serif'],
        balmy: ['Balmymorningblock', 'sans-serif'],
        balmyScript: ['Balmymorningscript', 'sans-serif']
      },
      keyframes: {
        spinning: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' }
        },
        comeInOut: {
          '0%, 100%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' }
        },
        dance: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
          }
        },
        spin: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' }
        },
        wiggle: {
          '0%': { transform: 'translateX(-1rem)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(1rem)' }
        }
      }
    }
  },
  plugins: []
};
