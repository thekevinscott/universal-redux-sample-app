import {
  types,
} from 'shared/modules/Login';

import {
  getType,
} from '../promise';

import {
  SAVE_TOKEN,
} from './types';

export default function authenticationMiddleware({
  dispatch,
  //getState,
}) {
  return next => action => {
    if (action.type === getType(types.LOGIN, 'fulfilled')) {
      const {
        response: {
          token,
        },
      } = action;

      dispatch({
        type: SAVE_TOKEN,
        token,
      });
    }

    return next(action);
  };
}
