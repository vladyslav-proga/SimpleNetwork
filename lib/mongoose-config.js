'use strict';

const mongoose = require('mongoose');

const config = require('./config');

//Create config obhect

module.exports = () => {
  mongoose
    .connect(config.mongouri, { useNewUrlParser: true })
    .then((() => console.log('MongoDB has been connected')))
    .catch(e => console.log(e));
};
