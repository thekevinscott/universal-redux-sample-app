import {
  actions as authenticationActions,
} from 'shared/redux/middlewares/authentication';
import getType from './getType';

export default function promiseMiddleware({
  //dispatch,
  //getState,
}) {
  return next => action => {
    if (!action || !action.promise) {
      return next(action);
    }

    const {
      promise,
      type,
      meta,
      ...rest,
    } = action;

    const result = promise();

    if (!result || !result.then) {
      return result;
    }

    // promise we assume to be a function that returns
    // a promise. other libraries might override this,
    // in which case additional checks could be done
    // here.

    const PENDING = getType(type, 'pending');
    const FULFILLED = getType(type, 'fulfilled');
    const REJECTED = getType(type, 'rejected');

    console.log('export a pending', PENDING);
    // continue on through the middleware stack
    next({ ...rest, meta, type: PENDING });

    return result.then(response => {
      next({
        type: FULFILLED,
        meta,
        response,
        ...rest,
      });
      return response;
    }).catch(error => {
      if (error.status === 401) {
        next(authenticationActions.unauthenticate);
      }

      next({
        type: REJECTED,
        meta,
        error,
        ...rest,
      });
      throw error;
    });
  };
}
