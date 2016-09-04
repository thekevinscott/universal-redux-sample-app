import fetch from 'isomorphic-fetch';

const getMethod = method => (method || 'get').toUpperCase();

const getBody = body => {
  if (body) {
    return {
      body: JSON.stringify(body),
    };
  }

  return null;
};

const getUrl = url => `/api/${(url.substring(0, 1) === '/' ? url.slice(1) : url)}`;

export default function (url, options = {}) {
  return fetch(getUrl(url), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
    ...(getBody(options.body)),
    method: getMethod(options.method),
  }).then(response => {
    if (response.status >= 400) {
      throw new Error(response);
    }
  });
}
