/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Orange Côte d'Ivoire — seule couleur d'accent
        brand: {
          DEFAULT: '#FF7900',
          dark: '#D96600',
          darker: '#B85400',
          light: '#FFF1E4',
          50: '#FFFAF5',
          100: '#FFE9D4',
          500: '#FF7900',
          600: '#E86A00',
          700: '#B85400',
        },
        // Noir pur — utilisé avec parcimonie (texte, accents ponctuels)
        ink: {
          DEFAULT: '#000000',
          soft: '#2A2A2A',
          faint: '#6B6B6B',
        },
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
