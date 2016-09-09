export const NODE_ENV = process.env.NODE_ENV || 'development';

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 3000;

export const WEBPACK_HOST = process.env.WEBPACK_HOST || HOST;
export const WEBPACK_PORT = process.env.WEBPACK_PORT || PORT + 1;

export const WEBPACK_PATH = `http://${WEBPACK_HOST}:${WEBPACK_PORT}`;

export const API_HOST = process.env.API_HOST || HOST;
export const API_PORT = process.env.API_PORT || 8000;

export const DISABLE_SERVER_RENDERING = process.env.DISABLE_SERVER_RENDERING === 'true' || false;
export const SERVER_RELOAD = process.env.SERVER_RELOAD || false;

export const CLIENT = process.env.CLIENT || false;

export const SECRET = 'sdfkjlk23jrweoisjdk2qwejkklajlj($*$*#$&#&@#$HJKF';
