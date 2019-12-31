module.exports = function(apis = [{ url: '/d', type: 'get', result: { code: 1 } }]) {
  let str = `
  const router = require("koa-router")()
  
  function generateApi (mappingUrl, reqType, result) {
    router[reqType](mappingUrl, ctx => ctx.body = result)
  }
  
  `
  apis.forEach(api => {
    const { url, type, result } = api
    str += `generateApi('${url}', '${type}', ${JSON.stringify(result)})
  `
  })

  str += `
  module.exports = router`
  return str
}
