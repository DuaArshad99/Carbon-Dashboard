/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ShadCN variant palette */
        primary: {
          DEFAULT: '#22C55E',    // bg-primary
          foreground: '#ffffff', // text-primary-foreground
        },
        secondary: {
          DEFAULT: '#3B82F6',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#F59E0B',    // you can map “accent” → “destructive” if you like
          foreground: '#000000',
        },
        neutral: {
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
