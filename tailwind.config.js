/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: theme => ({
        'page': '#F5F5F5',
      }),
      width: {
        '405': '405px',
      },
      height: {
        '540': '540px',
        '130': '130px'
      },
      colors: {
        cerulean: '#4281A4',
        yellowGreen: '#BDD358',
        gunmetal: '#172E3B',
        vanilla: '#FFEAAE',
        whiteSmoke: '#F5F5F5',
      },
      boxShadow: {
        'xl': '0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'mid': '0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)',
        'in': '0px 4px 80px 0px rgba(0, 0, 0, 0.25) inset',
      },
      borderRadius: {
        'large': '20px',
      },
      fontFamily: {
        'outfit': ['outfit', 'sans-serif'],
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },

    },
  },
  plugins: [],
}

