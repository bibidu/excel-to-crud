module.exports = function(apis = [{ url: '/d', type: 'get', result: { code: 1 } }]) {
  let str = `
  const router = require("koa-router")()
  const query = require('../utils/mysql')

  function generateApi ({
    url: mappingUrl,
    reqType,
    sqlString,
    apiType,
    retType,
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
        return query(withConditions).then(res => {
          if (retType === 'resultStatus') {
            return ctx.body = { code: 0, msg: '成功' }
          }
          return ctx.body = res
        }).catch(err => {
          return ctx.body = { code: -1, msg: '失败' }
        })
      })
    }
  }
  
  `

  str += `
  generateApi({
    url: '/getCanFilterAttrNames',
    reqType: 'get',
    sqlString: (ctx) => "select column_name from information_schema.columns where table_name = '" + ctx.query.tableName + "' ",
    apiType: 'auto'
  })
  `
  // insert into list(name, age) values('dxz', 123)
  str += `
  generateApi({
    url: '/add',
    reqType: 'post',
    sqlString: (ctx) => {
      let sql = 'insert into list'
      const body = ctx.request.body
      console.log('body ', body)
      const { entity } = body
      sql += '('
      sql += Object.keys(entity).join(',')
      sql += ') '
      sql += 'values('
      sql += Object.values(entity).map(item => "'" + item + "'").join(',')
      sql += ') '
      return sql
    },
    apiType: 'auto',
    retType: 'resultStatus'
  })
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
