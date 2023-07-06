/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
        'righteous': ['"Righteous"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
      },
      
      strokeWidth: {
        '2': '22px',
      }
    }
  },
  plugins: [],
}

