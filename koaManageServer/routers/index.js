
  const router = require("koa-router")()
  
  function generateApi (mappingUrl, reqType, result) {
    router[reqType](mappingUrl, ctx => ctx.body = result)
  }
  
  generateApi('/list', 'get', [{"id":"1","name":"杜宪章","age":"18","address":"金寨县"},{"id":"2","name":"赵冰冰","age":"27","address":"富阳镇"},{"id":"3","name":"李会烦","age":"31","address":"1"}])
  generateApi('/getById', 'get', undefined)
  
  module.exports = router