/*
 * Sets up the proxy server for an external API.
 */
//import fetch from 'isomorphic-fetch';
import httpProxy from 'http-proxy';

import {
  API_HOST,
  API_PORT,
} from 'config';

/*
function sendResponse(res, response) {
  res.status(200);
  res.json(response);
}

function sendError(res, err) {
  console.error('Error from Proxy fetch', err);
  res.status(500);
  res.json({ error: 'Invalid data' });
}

const getBody = body => {
  if (body) {
    return {
      body: JSON.stringify(body),
    };
  }

  return null;
};
*/

export default (app) => {
  const API = `http://${API_HOST}:${API_PORT}`;

  const proxy = httpProxy.createProxyServer({});

  // Proxy to API server
  app.use('/api', (req, res) => {
    const url = `${API}${req.url}`;
    console.log('prepare to proxy', url);

    proxy.web(req, res, {
      target: API,
    });

    /*
    proxy.on('proxyReq', (proxyReq) => {
      console.log('set the proxy req header');
      //proxyReq.setHeader('cookie', 'sessionid=' + cookieSnippedValue);
    });
    */
  });
};
