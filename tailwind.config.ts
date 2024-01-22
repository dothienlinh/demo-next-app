import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        centuryGothic: 'CenturyGothic',
        centuryGothicBold: 'CenturyGothic Bold'
      },
      backgroundImage: {
        'hero-pattern':
          'linear-gradient(255.39deg, #00daa6 -9.21%, #007caa 72.69%)'
      }
    }
  },
  plugins: []
}
export default config
