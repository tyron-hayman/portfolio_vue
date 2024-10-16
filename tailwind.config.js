module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1700px',
      // => @media (min-width: 1280px) { ... }
    },
  },
   variants: {
     extend: {},
   },
   plugins: [],
 }