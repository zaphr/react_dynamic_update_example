var webpack = require('webpack');
var path = require('path');

var BUILD = path.resolve(__dirname, 'public');
var APP = path.resolve(__dirname, 'app');

module.exports = {
  entry: APP + '/main.jsx',
  output: {
    path: BUILD,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP,
        loader : 'babel'
      }
    ]
  }
};
