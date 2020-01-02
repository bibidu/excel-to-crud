var Koa = require("koa")
var app = new Koa()
const bodyParser = require('koa-bodyparser')
var cors = require('koa2-cors');
const router = require('./routers')
const tasks = require('./tasks')

tasks().then(() => {
  app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(4000)
})
