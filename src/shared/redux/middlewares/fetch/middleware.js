import {
  actions as authenticationActions,
} from 'shared/redux/middlewares/authentication';

const {
  unauthenticate,
} = authenticationActions;

export default function fetchMiddleware({
  dispatch,
  //getState,
}) {
  return next => action => {
    if (!action || !action.fetch) {
      return next(action);
    }

    const {
      fetch,
    } = action;

    const promise = fetch({});

    return next({
      ...action,
      promise,
    }).catch(error => {
      if (error.status === 401) {
        dispatch(unauthenticate());
      }
    });
  };
}
