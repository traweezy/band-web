module.exports = {
  content: [
    './src/**/*.{html,js,jsx,tsx}',
    './src/App.tsx',
    './index/App.tsx',
    './public/index.html',
  ],
  theme: {
    fontFamily: {
      'metal-mania': ['Metal Mania', 'sans-serif'],
    },
    extend: {
      colors: { black: '#333' },
    },
  },
  plugins: [],
};
