/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        spiral: {
          '0%': { transform: 'rotate(0deg) translateX(0)' },
          '100%': { transform: 'rotate(360deg) translateX(100px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        zoomIn: 'zoomIn 1s ease-out forwards',
        spiral: 'spiral 5s ease-in-out infinite',
        fadeIn: 'fadeIn 2s ease-out forwards',
      },
    },
  },
  plugins: [],
}