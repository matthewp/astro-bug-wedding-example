import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Ashington', defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
