module.exports = function(apis = [{ url: '/d', type: 'get', result: { code: 1 } }]) {
  let str = `
  const router = require("koa-router")()
  const query = require('../utils/mysql')

  function generateApi (mappingUrl, reqType, sqlString) {
    if (sqlString) {
      router[reqType](mappingUrl, ctx => query(sqlString).then(res => ctx.body = res))
    }
  }
  
  `
  apis.forEach(api => {
    const { url, type, sqlString } = api
    str += `generateApi('${url}', '${type}', '${sqlString}')
  `
  })

  str += `
  module.exports = router`
  return str
}
