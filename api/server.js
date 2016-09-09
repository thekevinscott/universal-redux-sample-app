import express from 'express';
import bodyParser from 'body-parser';
//import fetch from 'isomorphic-fetch';
import authentication from './utils/authentication';
//import passport from 'passport';

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

import {
  //API_HOST,
  API_PORT,
} from '../src/config';

authentication(app);

//const loggedIn = (req, res, next) => {
  //if (req.user) {
    //next();
  //} else {
    //res.status(401);
    //res.json({ error: 'You are not logged in' });
  //}
//};

app.listen(API_PORT, () => {
  console.log(`API server running on port ${API_PORT}`);
});
