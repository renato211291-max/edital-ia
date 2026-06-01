import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Paleta institucional Edital IA
        primary: {
          DEFAULT: '#1F4E79',
          50: '#EBF2F9',
          100: '#D5E5F2',
          200: '#ABCAE5',
          300: '#80B0D8',
          400: '#5695CB',
          500: '#2E75B6',
          600: '#1F4E79',
          700: '#173B5C',
          800: '#0F273E',
          900: '#08141F',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2E75B6',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#BF8F00',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#C00000',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#006100',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F2F2F2',
          foreground: '#595959',
        },
        background: '#FFFFFF',
        foreground: '#202020',
        border: '#E5E7EB',
        input: '#E5E7EB',
        ring: '#1F4E79',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
