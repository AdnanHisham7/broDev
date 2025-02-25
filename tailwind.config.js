/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'custom-max': '2000px',
      },
      fontSize: {
        'xxs': '0.625rem', // 10px
      },
      colors: {
        customBg:{
          DEFAULT:'#000000',
        },
        customGreen: {
          DEFAULT: '#209039', // Base green color
        },
        customRed: {
          DEFAULT: '#902020', // Base green color
        },
        customGray:{
          DEFAULT:'#171717'
        },
        midGray:{
          DEFAULT:'#282828'
        },
        lightGray:{
          DEFAULT:'#313131'
        },
      },
    },
  },
  plugins: [],
}