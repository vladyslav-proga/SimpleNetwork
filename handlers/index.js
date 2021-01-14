'use strict';

const bodyParser = require('./body-parser');
const errors = require('./errors');
const passportInit = require('./passport-init');
// export all handlers files

module.exports = [
  bodyParser,
  errors,
  passportInit
];
