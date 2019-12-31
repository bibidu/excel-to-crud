var Koa = require("koa");
var app = new Koa();
var cors = require('koa2-cors');
const router = require('./routers')

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(4000)