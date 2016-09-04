import fetch from 'shared/utils/fetch';

//import {
  //LOGIN,
//} from './types';

export function login(body) {
  return dispatch => {
    return dispatch(fetch('/login', {
      method: 'post',
      body,
    }));
  };
}
