'use strict';

const Koa = require('koa');

const config = require('./lib/config');
const handlers = require('./handlers');

const app = new Koa();

// Add handlers files to app

handlers.forEach(h => app.use(h));

app.listen(config.port,
  () => console.log(`Server has been started on port ${config.port}`));

