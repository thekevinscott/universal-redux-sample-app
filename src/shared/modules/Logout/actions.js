import fetch from 'shared/utils/fetch';
import { push } from 'react-router-redux';

import {
  LOGOUT,
} from './types';

export function logout() {
  return dispatch => {
    return dispatch({
      type: LOGOUT,
      fetch: fetch('/logout', {
        method: 'post',
      }),
    }).then(() => {
      dispatch(push('/login'));
    });
  };
}
