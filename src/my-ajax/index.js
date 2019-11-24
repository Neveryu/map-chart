import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000
})

// service.interceptors.request.use()

service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return response => response
   */

   /**
    * Determine the request status by custom code
    * Here is just an example
    * You can also judge the status by HTTP Status Code
    */
  response => {
    const res = response.data
    if(res.code === 0) {
      return res.data
    } else {
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    if(error && error.response) {
      if(error.response.status === 404) {
        Indicator.close()
        Toast({
          message: '服务器异常-404',
          position: 'middle',
          duration: 2500
        })
        console.log('my-ajax service response error：' + error)  // for debug
        return Promise.reject(error)
      }
      if(error.response.status === 500) {
        // Message.closeAll()
        // Message.error(`服务器异常-500`)
        console.log('服务器异常-500')
        console.log('request service response error：' + error.response.data.toString()) // for debug
        return Promise.reject(new Error(error.response.data.message || 'Error'))
      }
    }
    // Message.closeAll()
    // Message.error(`服务器异常 - ${error}`)
    Indicator.close()
    console.log('my-ajax service response error：' + error)  // for debug
    return Promise.reject(error)
  }
)

export default service
