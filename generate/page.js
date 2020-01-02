module.exports = function(apiList) {
  // [{ apiName: 'list', type: 'get' }]
  let str = `
  import http from './http'
  `
  const apiNames = []

  // 查询过滤器的name list
  apiNames.push('getCanFilterAttrNames')

  str += `
  function getCanFilterAttrNames(tableName) {
    return http.get('getCanFilterAttrNames', { tableName: tableName })
  }
  `
  // 新增
  apiNames.push('add')

  str += `
  function add(entity) {
    return http.post('add', { entity: entity })
  }
  `

  apiList.forEach(({ apiName, type }) => {
    apiNames.push(apiName)

    str += `
    function ${apiName}(data) {
      return http.${type}('${apiName}', data)
    }
    `
  })
  
  str += `
  export default {
    ${apiNames.join(`,
    `)}
  }`

  return str
}
