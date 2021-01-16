module.exports = {
  purge: ['./lib/**/*.html', './lib/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'smoke-light': 'rgba(0, 0, 0, 0.4)',
        'smooth-green': '#007c71',
        'smooth-green-light': '#20b9a3',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
