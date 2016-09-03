/*
 * This kicks off the express server.
 */
import http from 'http';
import {
  PORT,
} from 'config';

export default (app) => {
  if (PORT) {
    const server = new http.Server(app);
    server.listen(PORT, err => {
      if (err) {
        console.error(err);
      }
      console.info(`App running on port ${PORT}`);
    });
  } else {
    throw new Error('Please specify a port');
  }
};
