import cookie from 'cookie';
import { push } from 'react-router-redux';
import {
  UNAUTHENTICATE,
} from './types';

export function unauthenticate() {
  return dispatch => {
    cookie.serialize('token', null);
    dispatch({
      type: UNAUTHENTICATE,
    });
    dispatch(push('/login'));
  };
}
