module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    fontFamily: {
      'metal-mania': ['Metal Mania', 'sans-serif'],
    },
    extend: {
      colors: { black: '#333' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
