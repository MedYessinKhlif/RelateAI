/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example font
        roboto: ['Roboto', 'sans-serif'], // Another example font
      },
    },
  },
  plugins: [],
};