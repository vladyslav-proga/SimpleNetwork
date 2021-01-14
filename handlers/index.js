'use strict';

const bodyParser = require('./body-parser');
const errors = require('./errors');

// export all handlers files

module.exports = [
  bodyParser,
  errors
];
