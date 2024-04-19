/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '300': '40rem',
      },
      Height: {
        '300': '40rem',
      }
    },
  },
  plugins: [],
}

