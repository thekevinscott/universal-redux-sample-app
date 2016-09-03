require('babel-polyfill');

// Webpack config for creating the production bundle.
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const strip = require('strip-loader');
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static/dist');

import {
  shared,
  webpackIsomorphicToolsPlugin,
} from './shared.config';

module.exports = Object.assign({}, shared, {
  module: {
    loaders: [
      ...(shared.module.loaders || []),
      {
        test: /.jsx?$/,  // Match both .js and .jsx
        exclude: /node_modules/,
        loaders: [
          strip.loader('debug'),
          'babel',
        ],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },


    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  plugins: [
    ...(shared.plugins || []),
    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    //new ExtractTextPlugin('[name]-[chunkhash].css', {
    new ExtractTextPlugin('main.css', {
      allChunks: true,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        DISABLE_SERVER_RENDERING: JSON.stringify(process.env.DISABLE_SERVER_RENDERING || false),
        CLIENT: true,
      },
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    webpackIsomorphicToolsPlugin,
  ],
});
