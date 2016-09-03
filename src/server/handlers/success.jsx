/*
 * This handles a successful request from a matched
 * route on the server.
 */
import React from 'react';
import { loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';
import { renderHTMLDocument } from '../utils';
import getReduxAsyncComponent from 'shared/redux/utils/getReduxAsyncComponent.jsx';

export default (store, renderProps, isomorphicTools) => {
  const serverArgs = {
    ...renderProps,
    store,
  };

  //console.log('prepare to load on server');
  return loadOnServer(serverArgs).then(() => {
    //console.log('we have loaded on server', store.getState());
    const component = (
      <Provider
        store={store}
      >
        {getReduxAsyncComponent(renderProps)}
      </Provider>
    );

    const payload = renderHTMLDocument({
      assets: isomorphicTools.assets(),
      store,
      component,
    });

    return {
      status: 200,
      payload,
    };
  });
};
