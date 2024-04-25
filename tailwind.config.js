/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-190': 'repeat(auto-fill, minmax(300px, 1fr))'
      }
    },
  },
  plugins: [require("daisyui")],
}
