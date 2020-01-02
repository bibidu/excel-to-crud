
  import http from './http'
  
  function getCanFilterAttrNames(tableName) {
    return http.get('getCanFilterAttrNames', { tableName: tableName })
  }
  
  function add(entity) {
    return http.post('add', { entity: entity })
  }
  
    function list(data) {
      return http.get('list', data)
    }
    
    function getById(data) {
      return http.get('getById', data)
    }
    
  export default {
    getCanFilterAttrNames,
    add,
    list,
    getById
  }