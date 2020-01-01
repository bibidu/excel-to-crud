
  const router = require("koa-router")()
  const query = require('../utils/mysql')

  function generateApi (mappingUrl, reqType, sqlString) {
    if (sqlString) {
      router[reqType](mappingUrl, ctx => query(sqlString).then(res => ctx.body = res))
    }
  }
  
  generateApi('/list', 'get', 'select * from list limit 0, 10')
  generateApi('/getById', 'get', '')
  
  module.exports = router