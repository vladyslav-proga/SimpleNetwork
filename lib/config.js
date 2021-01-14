'use strict';

module.exports = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_Uri,
  secret: process.env.SECRET || 'secret'
};
