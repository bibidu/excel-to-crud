
  import http from './http'
  
  function getCanFilterAttrNames(tableName) {
    return http.get('getCanFilterAttrNames', { tableName: tableName })
  }
  
    function list(data) {
      return http.get('list', data)
    }
    
    function getById(data) {
      return http.get('getById', data)
    }
    
  export default {
    getCanFilterAttrNames,
    list,
    getById
  }