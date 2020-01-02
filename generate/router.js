module.exports = function(apis = [{ url: '/d', type: 'get', result: { code: 1 } }]) {
  let str = `
  const router = require("koa-router")()
  const query = require('../utils/mysql')

  function generateApi ({
    url: mappingUrl,
    reqType,
    sqlString,
    apiType,
  }) {
    if (sqlString) {
      router[reqType](mappingUrl, ctx => {
        let withConditions = sqlString

        if (apiType === 'auto') {
          // 自动生成的接口, do nothing
          withConditions = sqlString(ctx)
        } else {
          // 用户定义的接口
          if (ctx.query && Object.keys(ctx.query).length) {
            Object.entries(ctx.query).forEach(([ key, value ]) => {
              if (key === 'orderBy') {
                withConditions += ' order by ' + value + ' '
              }
            })
          }
          withConditions += ' limit 0, 10'
        }
        return query(withConditions).then(res => ctx.body = res)
      })
    }
  }
  
  `

  str += `
  generateApi({ url: '/getCanFilterAttrNames', reqType: 'get', sqlString: (ctx) => "select column_name from information_schema.columns where table_name = '" + ctx.query.tableName + "' ", apiType: 'auto' })
  `
  apis.forEach(api => {
    const { url, type, sqlString } = api
    str += `generateApi({ url: '${url}', reqType: '${type}', sqlString: '${sqlString}', apiType: 'active' })
  `
  })

  str += `
  module.exports = router`
  return str
}
