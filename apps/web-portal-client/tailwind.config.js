module.exports = {
  purge: ['./lib/**/*.html', './lib/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'smoke-light': 'rgba(0, 0, 0, 0.4)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
