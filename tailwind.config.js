/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBg:{
          DEFAULT:'#0E1217',
        },
        customGreen: {
          DEFAULT: '#209039', // Base green color
        },
        customRed: {
          DEFAULT: '#902020', // Base green color
        },
      },
    },
  },
  plugins: [],
}