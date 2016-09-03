/*
 * This listens for any incoming requests
 * and routes them appropriately.
 */
import createHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { match } from 'react-router';

import createStore from 'shared/redux/createStore';
import getRoutes from 'shared/routes';

import { hydrateOnClient } from '../utils';

//import { loadOnServer } from 'redux-async-connect';
//import { Provider } from 'react-redux';

import {
  handleError,
  handleRedirect,
  handleNotFound,
  handleSuccess,
} from '../handlers';

import {
  NODE_ENV,
  DISABLE_SERVER_RENDERING,
} from 'config';

/*
 * Routes a match request to the appropriate handler.
 *
 * Every handler returns a promise, that will resolve with
 * either a redirect parameter, or a status and payload
 * parameter.
 */
const parseMatchedRoute = (
  error,
  redirectLocation,
  renderProps,
  store,
  isomorphicTools
) => {
  if (redirectLocation) {
    return handleRedirect(redirectLocation);
  } else if (error) {
    console.error('Routing error', error);
    const payload = hydrateOnClient(store, isomorphicTools.assets());
    return handleError(store).then(response => ({
      ...response,
      payload,
    }));
  } else if (renderProps) {
    return handleSuccess(store, renderProps, isomorphicTools);
  }

  return handleNotFound();
};

const main = (isomorphicTools) => {
  return (req, res) => {
    if (NODE_ENV === 'development') {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      isomorphicTools.refresh();
    }

    const memoryHistory = createHistory(req.originalUrl);
    const store = createStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    if (DISABLE_SERVER_RENDERING) {
      return res.send(hydrateOnClient(store, isomorphicTools.assets()));
    }

    return match({
      history,
      routes: getRoutes(store),
      location: req.originalUrl,
    }, (error, redirectLocation, renderProps) => {
      return parseMatchedRoute(
        error,
        redirectLocation,
        renderProps,
        store,
        isomorphicTools
      ).then((parsedRoute) => {
        const {
          status,
          payload,
          redirect,
        } = parsedRoute;

        if (redirect) {
          return res.redirect(redirect);
        }

        res.status(status);
        return res.send(payload);
      }).catch((err) => {
        console.error('error with route handler', err);
      });
    });
  };
};

export default (app, isomorphicTools) => {
  /*
   * Any incoming requests get routed through
   * the main function
   */
  app.use(main(isomorphicTools));
};
