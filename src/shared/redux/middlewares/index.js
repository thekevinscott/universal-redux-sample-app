import promiseMiddleware from './promise';
import authenticationMiddleware from './authentication';
import thunk from 'redux-thunk';

const middlewares = [
  thunk,
  promiseMiddleware,
  authenticationMiddleware,
];

export default middlewares;
