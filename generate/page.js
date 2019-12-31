module.exports = function(apiList) {
  // [{ apiName: 'list', type: 'get' }]
  let str = `
import http from './http'
`
  const apiNames = []
  apiList.forEach(({ apiName, type }) => {
    apiNames.push(apiName)

    str += `
function ${apiName}() {
  return http.${type}('${apiName}')
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
