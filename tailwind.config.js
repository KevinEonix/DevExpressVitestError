/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      display: ['Segoe UI', 'Arial', 'sans-serif'],
      body: ['Segoe UI', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#6391A2',
        gray: {
          100: '#EFF4F6',
          300: '#D3D1D2',
          800: '#666666',
        },
        blue: {
          500: '#C0D3DA',
          800: '#6391A2',
          900: '#3A6F82',
        },
      },
      gridTemplateRows: {
        narrow: '134px auto 50px',
      },
      gridTemplateAreas: {
        wide: [
          'header header header header header',
          'main main main main main',
          'footer footer footer footer footer',
        ],
        narrow: [
          'header header header header header',
          'aside main main main main',
          'aside footer footer footer footer',
        ],
        slim: ['header', 'aside', 'main', 'footer'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 0.5 },
        },
        'fade-out': {
          from: {
            opacity: 0.5,
          },
          to: {
            opacity: 0,
          },
        },
        'hide-modal': {
          from: {
            opacity: 1,
            translate: '0 0',
          },
          to: {
            opacity: 0,
            translate: '0 20px',
          },
        },
        'show-modal': {
          from: {
            opacity: 0,
            translate: '0 -20px',
          },
          to: {
            opacity: 1,
            translate: '0 0',
          },
        },
      },
      animation: {
        'modal-open': 'show-modal .3s ease-in-out ',
        'modal-close': 'hide-modal .3s ease-in-out ',
        'fade-in': 'fade-in .3s ease-in-out ',
        'fade-out': 'fade-out .3s ease-in-out ',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
};
