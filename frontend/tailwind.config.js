/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{html,js,jsx,tsx}", 
    "./components/**/*.{html,js,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        site: '#3e2f8a',
        site2: '#332673',
        black1aFaded: 'rgba(26, 26, 26, 0.2)',
        black1a: '#1A1A1A',
        greyf3: "#F3F3F3",
        whiteFaded: 'rgba(246, 246, 246, 0.8)',
      },

      fontSize: {
        xss: '0.5rem'
      }
    },
  },
  plugins: [],
}
