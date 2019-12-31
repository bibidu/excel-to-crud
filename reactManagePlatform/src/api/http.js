import axios from 'axios'

function get(url, data = {}) {
  console.log('gegege', url)
  return axios({
    method: 'get',
    url: `http://localhost:4000/${url}`,
    data: data
  })
}

function post(url, params) {

}

export default {
  get,
  post
}