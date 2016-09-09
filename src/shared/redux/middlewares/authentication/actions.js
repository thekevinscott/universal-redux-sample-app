import { push } from 'react-router-redux';
import {
  UNAUTHENTICATE,
} from './types';

export function unauthenticate() {
  return dispatch => {
    dispatch({
      type: UNAUTHENTICATE,
    });
    dispatch(push('/login'));
  };
}
