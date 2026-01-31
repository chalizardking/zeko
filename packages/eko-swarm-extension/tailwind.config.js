/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'eko-dark': '#1a1a1a',
        'eko-grey': '#2d2d2d',
        'eko-purple': '#7c3aed',
      }
    },
  },
  plugins: [],
}
