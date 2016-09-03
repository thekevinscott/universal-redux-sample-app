/*
 * This hydrates a given assets payload
 * and a store on the client.
 *
 * This will be called in two places:
 *
 * 1. If the server side routing catches an error,
 * we'll kick it to the client to give better
 * visibility into the error.
 *
 * 2. If server side rendering is explicitly
 * turned off (for instance, when developing)
 * we'll render directly to the server.
 */
import renderHTMLDocument from './renderHTMLDocument';

export default (store, assets) => {
  return renderHTMLDocument({
    assets,
    store,
  });
};
