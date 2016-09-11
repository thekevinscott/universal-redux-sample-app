//import cookie from 'cookie';

import {
  types,
} from 'shared/modules/Login';

import {
  getType,
} from '../promise';

//import {
  //SAVE_TOKEN,
//} from './types';

export default function authenticationMiddleware({
  //dispatch,
  //getState,
}) {
  return next => action => {
    if (action.type === getType(types.LOGIN, 'fulfilled')) {
      //const {
        //response: {
          //token,
        //},
      //} = action;

      //debugger;
      //cookie.serialize('token', token);
      //window.c = cookie;

      //dispatch({
        //type: SAVE_TOKEN,
        //token,
      //});
    }

    return next(action);
  };
}
