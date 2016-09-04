import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import * as reducers from 'shared/reducers';

export default combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer,
});
