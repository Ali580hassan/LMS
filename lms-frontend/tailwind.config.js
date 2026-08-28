/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0F1115',
          900: '#161922',
          800: '#1E222E',
          700: '#2A2F3D',
          600: '#3A4053',
        },
        paper: '#F7F6F2',
        brand: {
          50: '#EEF4FF',
          100: '#D9E6FF',
          300: '#9DBBFF',
          500: '#4C6FFF',
          600: '#3A57E8',
          700: '#2C43BE',
        },
        accent: {
          500: '#F5A524',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,17,21,0.06), 0 8px 24px rgba(15,17,21,0.06)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
