/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#FAF6F0',
        'bg-secondary': '#EFE7DA',
        'text-main': '#2B2420',
        'accent': '#7A8B6F',
        'warning': '#C97B4A',
        'border-main': '#DDD3C3',
      },
      fontFamily: {
        heading: ['Mitr', 'sans-serif'], // Thai friendly font for headings
        sans: ['Prompt', 'sans-serif'], // Thai friendly font for body
      },
    },
  },
  plugins: [],
}
