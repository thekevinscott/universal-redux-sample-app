import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import middlewares from './middlewares';

import {
  CLIENT,
  NODE_ENV,
} from 'config';

const getStore = (middleware) => {
  if (NODE_ENV === 'development' && CLIENT) {
    return compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )(_createStore);
  }

  return applyMiddleware(...middleware)(_createStore);
};

export default function createStore(history, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const finalCreateStore = getStore(middlewares.concat([
    reduxRouterMiddleware,
  ]));

  const reducer = require('./reducer');
  const store = finalCreateStore(reducer, data);

  if (NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'));
    });
  }

  return store;
}
