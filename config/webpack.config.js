'use-strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: './app/index.js',
    board: './app/board.js'
  },
  output: {
    path: path.join(__dirname + '/build/'),
    filename: '[name].js',
    chunkFilename: "[id].chunk.js",
    publicPath: '/build/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      { test: /\.less$/, loader: "style!css!less" }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
