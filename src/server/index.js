/*
 * Entry point for the server.
 *
 * Starts up the isomorphic
 * webpack server.
 */

import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import toolConfig from '../../webpack/webpack-isomorphic-tools';
import bootstrap from './bootstrap';

const rootDir = path.resolve(__dirname, '../..');

import {
  NODE_ENV,
} from 'config';

const isomorphicTools = new WebpackIsomorphicTools(toolConfig)
.development(NODE_ENV === 'development')
.server(rootDir, () => {
  bootstrap(isomorphicTools);
});
