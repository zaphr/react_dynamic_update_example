var webpack = require('webpack');
var path = require('path');

var BUILD = path.resolve(__dirname, 'public');
var APP = path.resolve(__dirname, 'app');

module.exports = {
  entry: APP + '/main.jsx',
  output: {
    path: BUILD,
    filename: 'bundle.js',
    publicPath: 'http://localhost:7700/dist'
  },
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      },
    }],
  },
  plugins: []

};