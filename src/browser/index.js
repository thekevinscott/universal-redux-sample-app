import 'babel-polyfill';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import createStore from 'shared/redux/createStore';
import getRoutes from 'shared/routes';
import renderIntoDOM from './renderIntoDOM.jsx';
//import getReduxAsyncComponent from 'shared/redux/utils/getReduxAsyncComponent.jsx';
import checkIfValidPayload from './checkIfValidPayload';

const _browserHistory = useScroll(() => browserHistory)();
const store = createStore(_browserHistory, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

const component = (
  <Router
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

const dest = document.getElementById('content');

// check to make sure the server payload was not discarded.
checkIfValidPayload(dest);

renderIntoDOM(component, store, dest);
