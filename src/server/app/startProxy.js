/*
 * Sets up the proxy server for an external API.
 */
import fetch from 'isomorphic-fetch';

import {
  API_HOST,
  API_PORT,
} from 'config';

function sendResponse(res, response) {
  res.status(200);
  res.json(response);
}

function sendError(res, err) {
  console.error('Error from Proxy fetch', err);
  res.status(500);
  res.json({ error: 'Invalid data' });
}

export default (app) => {
  const API = `http://${API_HOST}:${API_PORT}`;

  // Proxy to API server
  app.use('/api', (req, res) => {
    const url = `${API}${req.url}`;

    //console.log('fetch url from proxy', url);
    fetch(url).then(response => response.json()).then(response => {
      sendResponse(res, response);
    }).catch(err => {
      sendError(res, err);
    });
  });
};
