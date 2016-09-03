import express from 'express';
//import fetch from 'isomorphic-fetch';

const app = express();

import {
  //API_HOST,
  API_PORT,
} from '../src/config';

app.get('/', (req, res) => {
  res.json({});
});

app.listen(API_PORT, () => {
  console.log(`api server running on port ${API_PORT}`);
});
