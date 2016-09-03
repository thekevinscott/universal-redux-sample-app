/*
 * Used by both src/server/index.js, and webpack/prod.config.js
 *
 */
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

const config = {
  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif',
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
  },
};

export default config;
