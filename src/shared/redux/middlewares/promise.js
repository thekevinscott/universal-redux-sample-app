export default function promiseMiddleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const {
      promise,
      type,
      meta,
      ...rest,
    } = action;

    if (!promise) {
      return next(action);
    }

    // payload we assume to be a function that returns
    // a promise. other libraries might override this,
    // in which case additional checks could be done
    // here.

    const PENDING = `${type}_PENDING`;
    const FULFILLED = `${type}_FULFILLED`;
    const REJECTED = `${type}_REJECTED`;

    // continue on through the middleware stack
    next({ ...rest, meta, type: PENDING });

    return promise().then(response => {
      next({ ...rest, meta, response, type: FULFILLED });
    }).catch(error => {
      next({ ...rest, meta, error, type: REJECTED });
    });
  };
}
