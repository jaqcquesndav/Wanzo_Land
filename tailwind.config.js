/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#197ca8',
          hover: '#1e90c3',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#197ca8',
          600: '#1e90c3',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        success: {
          DEFAULT: '#015730',
          hover: '#016d3b',
        },
        warning: {
          DEFAULT: '#ee872b',
          hover: '#f19642',
        }
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.hover'),
              },
            },
            pre: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.gray.900'),
              padding: theme('spacing.4'),
              borderRadius: theme('borderRadius.lg'),
              margin: theme('spacing.4'),
            },
            code: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.gray.900'),
              padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
              borderRadius: theme('borderRadius.md'),
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
              borderRadius: 0,
            },
            '.math': {
              fontSize: '1.1em',
            },
            '.math-display': {
              margin: theme('spacing.4'),
              overflowX: 'auto',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}