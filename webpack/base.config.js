var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../app/public/js');
var APP_DIR = path.resolve(__dirname, '../app/src');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ])
  ]
};
