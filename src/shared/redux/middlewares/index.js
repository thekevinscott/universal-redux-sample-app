import promiseMiddleware from './promise';
import fetchMiddleware from './fetch';
import authenticationMiddleware from './authentication';
import thunk from 'redux-thunk';

const middlewares = [
  thunk,
  fetchMiddleware,
  promiseMiddleware,
  authenticationMiddleware,
];

export default middlewares;
