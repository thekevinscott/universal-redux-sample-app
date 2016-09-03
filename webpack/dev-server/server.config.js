/* Configuration for webpack dev server */

const webpackConfig = require('../dev.config.babel');

const config = {
  quiet: false,
  progress: true,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  watchOptions: {
    poll: 200,
  },
  publicPath: webpackConfig.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
    //'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true',
  },
  stats: {
    colors: true,
    chunks: false,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    publicPath: false,
  },
};

export default config;
