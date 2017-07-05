const webpack = require('webpack');

module.exports = {
  entry: {
    index:'./src/js/index.js',
    statistic:'./src/js/statistic.js',
    index: './src/js/ceshi/index.js',
    download: './src/js/ceshi/download.js'
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
  }
};