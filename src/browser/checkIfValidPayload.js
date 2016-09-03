/*
 * A sanity check to see if the server has returned
 * a valid payload.
 *
 * If not, alert the developer so long as we're
 * not in production.
 */
import React from 'react';

function isInvalid(dest) {
  return !dest
    || !dest.firstChild
    || !dest.firstChild.attributes
    || !dest.firstChild.attributes['data-react-checksum'];
}

import {
  NODE_ENV,
  DISABLE_SERVER_RENDERING,
} from 'config';

const alertMsg = 'Server-side React render was discarded. ' +
  'Make sure that your initial render does not ' +
  'contain any client-side code.';

export default (dest) => {
  if (NODE_ENV === 'development') {
    window.React = React; // enable debugger

    if (isInvalid(dest)) {
      if (!DISABLE_SERVER_RENDERING) {
        console.error(alertMsg);
      } else {
        console.log('Server side rendering is off');
      }
    }
  } else if (DISABLE_SERVER_RENDERING) {
    console.log('Server side rendering is turned off on production');
  }
};
