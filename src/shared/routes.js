import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Container from 'shared/redux/Container';
import { Home } from 'shared/modules/Home';
import { Page } from 'shared/modules/Page';
import { Login } from 'shared/modules/Login';
import { Logout } from 'shared/modules/Logout';
import { Register } from 'shared/modules/Register';

const requireAuthCreator = getState => (nextState, replace) => {
  const {
    user,
  } = getState();

  console.log('user', user);

  if (!user) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
      },
    });
  }
};

export default (store) => {
  const requireAuth = requireAuthCreator(store.getState);

  return (
    <Route
      path="/"
      component={Container}
    >
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="/some-other-page" component={Page} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="register" component={Register} />
    </Route>
  );
};
