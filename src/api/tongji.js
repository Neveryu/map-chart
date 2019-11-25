import request from '@/my-ajax'
import API_URL from '@/url'

// 获取首页概况数据
function getTongjiData(startTime, endTime) {
  return request({
    method: 'get',
    url: API_URL.getTongji,
    params: {
      startTime,
      endTime
    }
  })
}

export { getTongjiData }
