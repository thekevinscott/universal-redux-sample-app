require('babel-polyfill');

// Webpack config for development
import path from 'path';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import toolConfig from './webpack-isomorphic-tools';
export const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(toolConfig);

export const shared = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240',
      },
    ],
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  entry: {
    main: [
      './src/browser/index.js',
    ],
  },
};
