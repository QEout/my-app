import axios from 'axios'
const instance = axios.create({
  baseURL: '/api',
  timeout: 50000
})

//请求响应拦截
instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error)
})
export function get(url, params) {
  return instance.get(url, {
    params
  })
}
export function post(url, data) {
  return instance.post(url, data)
}