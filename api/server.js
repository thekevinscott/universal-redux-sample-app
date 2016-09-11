import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
//import fetch from 'isomorphic-fetch';
import authentication from './utils/authentication';
//import passport from 'passport';

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

import {
  //API_HOST,
  API_PORT,
} from '../src/config';

authentication(app);

app.listen(API_PORT, () => {
  console.log(`API server running on port ${API_PORT}`);
});
