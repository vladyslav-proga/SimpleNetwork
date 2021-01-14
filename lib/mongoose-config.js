'use strict';

const mongoose = require('mongoose');

const config = require('./config');

//connect to DB

module.exports = () => {
  mongoose
    .connect(config.mongoUri,
      { useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then((() => console.log('MongoDB has been connected')))
    .catch(e => console.log(e));
};
