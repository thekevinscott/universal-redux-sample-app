import fetch from 'isomorphic-fetch';

class ApiError extends Error {
  constructor(props = {}) {
    super(props);
    this.code = props.code || 1;
    this.message = props.message || 'Unknown Error';
    this.status = props.status;
  }
}

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

const parseErrorJSON = (status, text) => {
  try {
    const {
      error: {
        code,
        message,
      },
    } = JSON.parse(text);

    return {
      code,
      message,
      status,
    };
  } catch (error) {
    return {
      status,
    };
  }
};

const handleError = status => text => {
  throw new ApiError(parseErrorJSON(status, text));
};

export default function (url, options = {}) {
  return () => fetch(getUrl(url), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
    ...(getBody(options.body)),
    method: getMethod(options.method),
  }).then(response => {
    if (response.status >= 400) {
      return response.text().then(handleError(response.status));
    }

    return response.json();
  });
}
