import fetch from 'shared/utils/fetch';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import {
  LOGIN,
} from './types';

export function login(body) {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      promise: fetch('/login', {
        method: 'post',
        body,
      }),
    }).then(() => {
      //console.log('now go!', response);
      dispatch(push('/'));
    }).catch(err => {
      if (err.code === 2) {
        throw new SubmissionError({
          _error: 'Login failed. Please try again.',
        });
      }

      throw new SubmissionError({
        _error: err.message,
      });
    });
  };
}

export function validate(values) {
  return Object.keys(values).reduce((obj, key) => {
    const field = values[key];

    if (!field) {
      return {
        ...obj,
        [key]: 'Required',
      };
    }

    return {
      ...obj,
    };
  }, {});
}
