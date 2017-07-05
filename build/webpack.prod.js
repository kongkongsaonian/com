const webpack = require('webpack');

module.exports = {
  entry: {
    index:'./src/js/index.js',
    statistic:'./src/js/statistic.js'
  },
  output: {
    filename: './[name]/[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
   plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    })]
};