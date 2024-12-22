/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
      colors: {
        'redGlobal': '#be2a3f',
        'zinc': {
          '50': '#fafafa',
          '100': '#f4f4f5',
          '200': '#e4e4e7',
          '800': '#27272a',
          '900': '#18181b',
          '950': '#09090b',
        },
  
      }
    },
    plugins: [],
  }