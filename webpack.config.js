'use strict'

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['whatwg-fetch', './src/index.jsx'],
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve(__dirname, 'src/'),
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true,
        }
      },
      {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
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
        include: path.resolve(__dirname, 'src/')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
            name: '[name].[hash:7].[ext]',
            publicPath: 'images/',
            outputPath: 'images/',
        },
        include: path.resolve(__dirname, 'src/images')
      }
      //, {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'file-loader',
      //   options: {
      //       name: '[name].[hash:7].[ext]',
      //       publicPath: 'fonts/',
      //       outputPath: 'fonts/',
      //   },
      //   include: path.resolve(__dirname, 'assets/fonts')
      // },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ],
  devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 8000,
      historyApiFallback: true,
      inline: true,
  }
}
