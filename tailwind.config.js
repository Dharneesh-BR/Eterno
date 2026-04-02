module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h1-md': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h2': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        'h2-md': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        'h3': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3-md': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'button': ['1rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      colors: {
        // Fume.fit inspired health/wellness color scheme
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #86efac 75%, #4ade80 100%)',
        'background-grey': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)',
        main: '#16a34a',
        'main-dark': '#15803d',
        accent: '#22c55e',
        'accent-light': '#86efac',
        'accent-dark': '#059669',
        text: '#1f2937',
        'text-light': '#6b7280',
        'text-grey': '#374151',
        'text-light-grey': '#6b7280',
        heading: '#111827',
        'heading-grey': '#1f2937',
        // Health-specific colors
        'health-primary': '#10b981',
        'health-primary-dark': '#059669',
        'health-secondary': '#14b8a6',
        'health-secondary-dark': '#0d9488',
        'health-accent': '#06b6d4',
        'health-accent-dark': '#0891b2',
        'health-dark': '#047857',
        'health-light': '#d1fae5',
        'health-light-dark': '#a7f3d0',
        // Grey theme specific colors
        'bg-grey': '#f8fafc',
        'bg-grey-dark': '#f1f5f9',
        'card-grey': '#ffffff',
        'card-grey-dark': '#f8fafc',
        'border-grey': '#e2e8f0',
        'border-grey-dark': '#cbd5e1',
        // Neutral colors for contrast
        white: '#ffffff',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
    },
  },
  plugins: [],
};
