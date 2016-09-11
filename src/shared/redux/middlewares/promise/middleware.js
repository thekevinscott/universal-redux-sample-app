import getType from './getType';

const getResult = promise => {
  if (typeof promise === 'function') {
    return promise();
  }

  return promise;
};

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

    const result = getResult(promise);

    if (!result || !result.then) {
      return result;
    }

    const PENDING = getType(type, 'pending');
    const FULFILLED = getType(type, 'fulfilled');
    const REJECTED = getType(type, 'rejected');

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

