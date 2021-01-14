'use strict';

const passport = require('koa-passport');
const passportConfig = require('../lib/passport-config');

//Export init func result
passportConfig(passport);

module.exports = passport.initialize();
