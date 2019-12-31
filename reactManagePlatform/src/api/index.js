
import http from './http'

function list() {
  return http.get('list')
}
    
function getById() {
  return http.get('getById')
}
    
export default {
  list,
  getById
}