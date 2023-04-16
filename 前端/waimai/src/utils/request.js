// 封装axios请求模块
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:7777/', //基础路径
  timeout: 5000, //设置请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 获取并为每个请求都添加token
    let token = window.localStorage.getItem('token')
    if (token) {
      config.headers.token = token
      // return config
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // console.log(error)
    return Promise.reject(error)
  }
)

// 导出模块
export default request
