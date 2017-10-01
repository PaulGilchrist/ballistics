var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  //devtool: 'source-map',

  output: {
    path: helpers.root('build'),
    publicPath: '/',
    //filename: '[name].js',
    filename: '[name].[hash].js',
    //chunkFilename: '[id].chunk.js'
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      beautify: false,
      compress: {
        screw_ie8 : true,
        warnings: true
      },
      mangle: {
        keep_fnames: true,
        screw_ie8 : true
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    //new ExtractTextPlugin('[name].css'),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })

  ]
});