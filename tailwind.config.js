/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './<custom directory>/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        positive: 'rgb(59, 220, 148)',
        negative: 'rgb(255, 88, 89)',
        dark: 'rgb(29, 25, 43)',
        nuetral: 'rgb(93, 91, 93)',
        light: 'rgb(255, 255, 255)',
      },
    },
  },
  plugins: [],
};
