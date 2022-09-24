/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '768': '768px',
      },
      colors: {
        'theme-black': '#1B1A17',
        'theme-yellow': '#F0A500',
        'theme-orange': '#E45826',
        'theme-beige': '#E6D5B8',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
