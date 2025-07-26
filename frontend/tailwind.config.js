/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['Menlo', 'Consolas', 'Courier New', 'Hannotate SC', 'DengXian', 'monospace'],
      },
      boxShadow: {
        'pixel': '3px 3px 0 rgba(0, 0, 0, 1)',
        'pixel-hover': '4px 4px 0 rgba(0, 0, 0, 1)',
        'pixel-focus': '3px 3px 0 rgba(0, 0, 0, 1)',
      },
      letterSpacing: {
        'pixel': '1px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
} 