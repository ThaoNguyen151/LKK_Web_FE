export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['bg-brand-orange', 'text-brand-orange', 'border-brand-orange'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        'brand-orange': '#FFAC3F',
        'brand-soft': '#F3F1F7',
      },

      fontFamily: {
        display: ['"1FTV VIP Amoria"', 'serif'],
        body: ['"iCiel Internacional"', 'system-ui', 'sans-serif'],
        text: ['"iCiel Internacional"', 'system-ui', 'sans-serif'],
      },

      spacing: {
        25: '6.25rem',
      },
    },
  },
  plugins: [],
}
