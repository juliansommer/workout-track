import type { Config } from 'tailwindcss';

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'ct-dark-600': '#222',
        'ct-dark-200': '#e5e7eb',
        'ct-dark-100': '#f5f6f7',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;