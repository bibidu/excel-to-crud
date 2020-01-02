import axios from 'axios'

function get(url, data = {}) {
  console.log('[HTTP.GET]', url)
  return axios({
    method: 'get',
    url: `http://localhost:4000/${url}`,
    params: data
  })
}

function post(url, data = {}) {
  console.log('[HTTP.POST]', url)
  return axios({
    method: 'post',
    url: `http://localhost:4000/${url}`,
    data: data
  })
}

export default {
  get,
  post
}