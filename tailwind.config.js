/** @type {import('tailwindcss').Config} */
export default {
  // Dark mode is driven by a `.dark` class on <html>, set in src/main.js.
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // House red for Release The Fizz — a slightly deeper crimson than
        // Tailwind's default red, chosen to read as our own rather than to
        // match any beverage manufacturer's brand colour.
        brand: {
          50:  '#fff1f3',
          100: '#ffe0e5',
          200: '#ffc6ce',
          300: '#ff9daa',
          400: '#ff6478',
          500: '#f8334d',
          600: '#dd1435',
          700: '#ba0f2c',
          800: '#9b1029',
          900: '#851428',
          950: '#4a0410',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        // One elevation ladder, used consistently instead of ad-hoc shadow classes.
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
        raised: '0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.04)',
        panel: '0 8px 32px rgba(15, 23, 42, 0.10)',
      },
      transitionDuration: {
        150: '150ms',
      },
    },
  },
  plugins: [],
}
