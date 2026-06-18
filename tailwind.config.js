/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: '#1A1A2E',
        'navy-light': '#2d2d4e',
      }
    },
  },
  plugins: [],
}
