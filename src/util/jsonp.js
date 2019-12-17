// 封装一个jsonp函数
import originJSONP from 'jsonp'

function param(data) {
  let url = ''
  for(var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    if(typeof(value) === 'objcet') {
      url += `&${k}=${encodeURIComponent(JSON.stringify(value))}`
    } else {
      url += `&${k}=${encodeURIComponent(value)}`
    }
  }
  return url ? url.substring(1) : ''
}

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if(!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
