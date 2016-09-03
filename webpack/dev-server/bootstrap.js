const Express = require('express');
const webpack = require('webpack');

const webpackConfig = require('../dev.config.babel');
const compiler = webpack(webpackConfig);

import {
  WEBPACK_HOST,
  WEBPACK_PORT,
} from 'config';

import serverOptions from './server.config';

const app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(WEBPACK_PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Webpack development server listening on ${WEBPACK_HOST}:${WEBPACK_PORT}`);
  }
});
