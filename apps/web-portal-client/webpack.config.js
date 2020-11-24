const debug = process.env.NODE_ENV !== 'production'
const path = require('path')

const srcPath = path.join(__dirname, 'lib')

module.exports = {
  mode: process.env.NODE_ENV,
  context: srcPath,
  devtool: debug ? 'inline-sourcemap' : '',
  entry: {
    app: ['./index.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        ],
      },
      {test: /\.html$/, loader: 'html-loader'},
    ],
  },
  node: {
    crypto: 'empty',
    net: 'empty',
    dns: 'empty',
    fs: 'empty',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    publicPath: 'http://127.0.0.1:8086/',
    contentBase: './',
    hot: true,
    inline: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    historyApiFallback: true,
  },
  output: {
    globalObject: 'this',
    path: srcPath,
    filename: 'client.min.js',
    publicPath: '/',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
    },
  },
  externals: [
    {
      xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}',
    },
  ],
}
