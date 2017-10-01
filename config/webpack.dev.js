var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    output: {
        path: helpers.root('build'),
        publicPath: 'http://localhost:3000/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].[hash].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }

});