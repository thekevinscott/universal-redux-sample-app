import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Container from 'shared/redux/Container';
import { Home } from 'shared/modules/Home';
import { Login } from 'shared/modules/Login';
import { Logout } from 'shared/modules/Logout';
import { Register } from 'shared/modules/Register';

function requireAuth(nextState, replace) {
  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname },
  });
}

export default () => {
  return (
    <Route
      path="/"
      component={Container}
    >
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="register" component={Register} />
    </Route>
  );
};
