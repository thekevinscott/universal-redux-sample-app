/* eslint-disable */
var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
try {
  var babelRegister = require('babel-register');
} catch(err) {
  console.error('error w babel register', err);
}

try {
  var parsedBabel = JSON.parse(babelrc);
  babelRegister(parsedBabel);
} catch (err) {
  console.error('Error parsing .babelrc', err);
  //throw new Error('Error parsing .babelrc: ' + err);
}

