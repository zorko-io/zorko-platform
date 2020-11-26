module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', '../../.eslintrc'],
  plugins: ['react', 'react-hooks', 'eslint-plugin-react', 'eslint-plugin-prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        assert: 'either',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@util-validation', '../../packages/util-validation']
        ],
        extensions: ['.ts', '.js', '.jsx', '.json', '.mjs']
      },
    },
  },
}
