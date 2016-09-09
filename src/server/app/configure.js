/*
 * Configuration file for the express server.
 *
 * Sets up compression and static file serving.
 */
import compression from 'compression';
import express from 'express';
import path from 'path';
//import bodyParser from 'body-parser';
import session from 'express-session';
//import connectRestreamer from 'connect-restreamer';

import {
  SECRET,
} from '../../config';

export default (app) => {
  const staticPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'static'
  );
  // make sure to set static directory
  // before session storage below, or else
  // multiple sessions could get opened for
  // each request for static content! Geeuh
  app.use(compression());
  app.use(express.static(staticPath));

  //app.use(bodyParser.urlencoded({
    //extended: true,
  //}));

  //app.use(bodyParser.json());

  app.set('trust proxy', 1); // trust first proxy

  // might be a good idea to use redis in production
  app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // allow setting secure cookies based on whether
      // http or https
      secure: 'auto',
    },
  }));

  // for working with http-proxy and body parser,
  // instead of having to use the buffer option
  //app.use(connectRestreamer());
};
