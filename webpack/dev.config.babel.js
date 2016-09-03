require('babel-polyfill');

// Webpack config for development
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const assetsPath = path.resolve(__dirname, '../static/dist');
import {
  WEBPACK_PATH,
  SERVER_RELOAD,
} from '../src/config';

const babelrc = fs.readFileSync('./.babelrc');
let babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('Error with .babelrc', err);
}

const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
const combinedPlugins = (
  babelrcObject.plugins || []
).concat(
  babelrcObjectDevelopment.plugins
);

const babelLoaderQuery = Object.assign(
  {},
  babelrcObjectDevelopment,
  babelrcObject,
  {
    plugins: combinedPlugins,
  },
);
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server,
// and we don't want HMR enabled on the server,
// we have to add the babel plugin react-transform-hmr
// manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
let reactTransform = null;
for (let i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  const plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = [
    'react-transform', {
      transforms: [],
    },
  ];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] });
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module'],
});

import {
  shared,
  webpackIsomorphicToolsPlugin,
} from './shared.config';

const scssConfig = 'style!css!sass';
const cssConfig = 'style!css';

const hotMiddlewareOptions = [
  // turns off console logging
  //'quiet=true',
  // allows webpack to force reload when stuck,
  // but only when not using nodemon
  (!SERVER_RELOAD) ? 'reload=true' : null,
  `path=${WEBPACK_PATH}/__webpack_hmr`,
].join('&');

module.exports = Object.assign({}, shared, {
  module: {
    loaders: [
      ...(shared.module.loaders || []),
      {
        test: /.jsx?$/,  // Match both .js and .jsx
        exclude: /node_modules/,
        loaders: [
          `babel?${JSON.stringify(babelLoaderQuery)}`,
          //'eslint-loader',
        ],
      },
      { test: /\.scss$/, loader: scssConfig },
      { test: /\.css$/, loader: cssConfig },
    ],
  },
  entry: {
    main: [
      `webpack-hot-middleware/client?${hotMiddlewareOptions}`,
      ...(shared.entry.main || []),
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    //filename: '[name]-[hash].js',
    //chunkFilename: '[name]-[chunkhash].js',
    publicPath: `${WEBPACK_PATH}/dist/`,
  },
  plugins: [
    ...(shared.plugins || []),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        DISABLE_SERVER_RENDERING: JSON.stringify(process.env.DISABLE_SERVER_RENDERING || false),
        CLIENT: true,
      },
    }),
    webpackIsomorphicToolsPlugin.development(),
    /*
    new FlowStatusWebpackPlugin({
      quietSuccess: true,
      binaryPath: path.join(__dirname, '..', 'node_modules', '.bin', 'flow'),
    }),
    */
  ],
});
