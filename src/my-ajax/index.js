import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// service.interceptors.request.use()

service.interceptors.response.use(
  response => response
)

export default service
