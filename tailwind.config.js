/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rosa': '#E83E8C',
        'naranja': '#F9690E',
        'amarillo': '#F4D03F',
        'turquesa': '#1ABC9C',
        'morado': '#9B59B6',
        'blanco': '#ECF0F1',
        'oscuro': '#2C3E50',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [],
}