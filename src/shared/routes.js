import React from 'react';
//import { Route, IndexRoute } from 'react-router';
import { Route } from 'react-router';

import App from 'shared/redux/App';

export default () => {
  return (
    <Route path="/" component={App} />
  );
};
