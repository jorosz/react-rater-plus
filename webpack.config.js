var path = require('path')
const webpack = require("webpack");

const webpackModule = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader','css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]','postcss-loader']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'eslint-loader',
    }
  ]
  }

  module.exports = [
    {
      name: 'lib',
      entry: __dirname + '/src/index.js',
      output: {
        path: __dirname + '/lib',
        filename: 'rater.js',
        library: 'ReactRaterPlus',
        libraryTarget: 'umd',
        umdNamedDefine: true
      },
      module: webpackModule,
      externals: {
        "react-css-themr": "commonjs react-css-themr",
        "react": "commonjs react",
        "react-dom": "commonjs react-dom",
        "prop-types": "commonjs prop-types"
      }
    },{
      name: 'example',
      entry: __dirname + '/example/index.js',
      output: {
        path: __dirname + '/example',
        filename: 'bundle.js'
      },
      devServer: {
        contentBase: path.join(__dirname, "example"),
      },
      module: webpackModule
    },

  ]
