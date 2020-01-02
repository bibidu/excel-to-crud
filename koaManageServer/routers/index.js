
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
  
  
  generateApi({ url: '/getCanFilterAttrNames', reqType: 'get', sqlString: (ctx) => "select column_name from information_schema.columns where table_name = '" + ctx.query.tableName + "' ", apiType: 'auto' })
  generateApi({ url: '/list', reqType: 'get', sqlString: 'select * from list', apiType: 'active' })
  generateApi({ url: '/getById', reqType: 'get', sqlString: '', apiType: 'active' })
  
  module.exports = router