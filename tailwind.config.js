/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Alexandria', 'Tajawal', 'sans-serif'],
        body: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          // أخضر داكن فاخر
          50: '#eaf6f2',
          100: '#cfe8e0',
          200: '#9fd3c5',
          300: '#6bbca8',
          400: '#3aa087',
          500: '#0e7a63',
          600: '#06604e',
          700: '#054a3d',
          800: '#054239', // اللون الأساسي
          900: '#00332c',
          950: '#002623',
        },
        gold: {
          50: '#faf7ef',
          100: '#f2ecd9',
          200: '#e4d8b4',
          300: '#d3c08b',
          400: '#c4ac72',
          500: '#b9a779', // ذهبي رئيسي
          600: '#a08b57',
          700: '#988561',
          800: '#6b5636',
          900: '#4d3f28',
        },
        wine: {
          50: '#f9eded',
          100: '#f0d7d9',
          200: '#e0afb5',
          300: '#ca8290',
          400: '#b3576a',
          500: '#8e3448',
          600: '#6b1f2a', // أحمر داكن
          700: '#4a151e',
          800: '#260f14',
          900: '#1a0a0d',
        },
        cream: '#edebe0',
        ink: {
          100: '#3d3a3b',
          900: '#161616',
        },
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
        xl4: '2.25rem',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(5 66 57 / 0.04), 0 8px 24px -8px rgb(5 66 57 / 0.10)',
        lift: '0 2px 4px 0 rgb(5 66 57 / 0.05), 0 16px 40px -12px rgb(5 66 57 / 0.16)',
        glow: '0 0 0 4px rgb(5 66 57 / 0.12)',
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
