/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Thmanyah Serif Display"', 'Tajawal', 'serif'],
        body: ['"IBM Plex Sans Arabic"', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        // الأخضر الزمردي — اللون الأساسي للهوية
        brand: {
          50: '#eaf7f4',
          100: '#d2f1eb',
          200: '#a5e2d6',
          300: '#6fcfbb',
          400: '#1db79a',
          500: '#12967f',
          600: '#0d7562',
          700: '#07553b',
          800: '#084239', // اللون الأساسي
          900: '#05312b',
          950: '#042624',
        },
        // العنابي الداكن — لون ثانوي للتمييز
        burgundy: {
          50: '#f9edef',
          100: '#f4dbdf',
          200: '#e6b6bf',
          300: '#d48c9b',
          400: '#ba5f74',
          500: '#6d1e2b', // اللون الرئيسي
          600: '#5f0113',
          700: '#491220',
          800: '#360d18',
          900: '#290a12',
        },
        gold: {
          50: '#f5f3ec',
          100: '#ece8dd',
          200: '#ddd3bf',
          300: '#d3c097',
          400: '#c9b585',
          500: '#b6a67a', // الذهبي الرملي الرئيسي
          600: '#958162',
          700: '#78684e',
          800: '#5a4d39',
          900: '#3e3527',
        },
        ink: {
          50: '#f2f2f2',
          200: '#cccccc',
          400: '#999999',
          600: '#5c5a5b',
          100: '#3c3a3b',
          900: '#161616',
        },
        // أسماء بديلة محفوظة للتوافق مع الكود القديم
        wine: {
          50: '#f9edef',
          100: '#f4dbdf',
          200: '#e6b6bf',
          300: '#d48c9b',
          400: '#ba5f74',
          500: '#6d1e2b',
          600: '#5f0113',
          700: '#491220',
          800: '#360d18',
          900: '#290a12',
        },
        cream: '#f5f3ec',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
        xl4: '2.25rem',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(8 66 57 / 0.04), 0 8px 24px -8px rgb(8 66 57 / 0.10)',
        lift: '0 2px 4px 0 rgb(8 66 57 / 0.05), 0 16px 40px -12px rgb(8 66 57 / 0.16)',
        glow: '0 0 0 4px rgb(8 66 57 / 0.12)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp .6s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
