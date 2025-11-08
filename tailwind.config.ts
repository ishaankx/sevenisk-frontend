import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand-teal': '#00FFF0',
        'brand-teal-dark': '#09d2c4',
        'brand-teal-hover': '#19c9be',
        'dark-bg': '#080808',
        'dark-card': '#262626',
        'dark-text': '#ababab',
      },
      // --- HERE IS YOUR BACKGROUND IMAGE ---
      backgroundImage: {
        'hero-pattern': "url('/images/b.jpg')",
      },
      // --- END OF BACKGROUND IMAGE ---
      height: {
        '100vh': '100vh',
      },
    },
  },
  plugins: [
    typography,
  ],
}
export default config