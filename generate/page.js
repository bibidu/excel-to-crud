module.exports = function(apiList) {
  // [{ apiName: 'list', type: 'get' }]
  let str = `
  import http from './http'
  `
  const apiNames = []

  apiNames.push('getCanFilterAttrNames')

  str += `
  function getCanFilterAttrNames(tableName) {
    return http.get('getCanFilterAttrNames', { tableName: tableName })
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
