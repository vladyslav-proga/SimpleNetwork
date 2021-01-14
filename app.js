'use strict';

require('dotenv').config();

const Koa = require('koa');

//Export files
const config = require('./lib/config');
const handlers = require('./handlers');
const controllers = require('./controllers');
const mongooseConfig = require('./lib/mongoose-config');

const app = new Koa();

// Add handlers files to app

handlers.forEach(h => app.use(h));
mongooseConfig();

app.use(controllers.routes());
app.use(controllers.allowedMethods());


app.listen(config.port,
  () => console.log(`Server has been started on port ${config.port}`));
