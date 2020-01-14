const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, './index.js'),
  ],
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 1%', 'last 2 versions']
                }
              }],
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties'],
              ['@babel/plugin-transform-react-jsx'],
              // ['react-hot-loader/babel']
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}