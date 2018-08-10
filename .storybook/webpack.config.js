'use strict'

const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve(__dirname, '..', 'src/'),
        exclude: /story/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true,
        }
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]',
              importLoaders: 1,
            }
          },
          'stylus-loader'
        ],
        include: path.resolve(__dirname, '..', 'src/')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
            limit: 1000,
            name: path.resolve(__dirname, '..', 'assets/images/[name].[hash:7].[ext]')
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: path.resolve(__dirname, '..', 'assets/fonts/[name].[hash:7].[ext]')
        }
    },
    ],
  },
}
