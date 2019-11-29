import request from '@/my-ajax'
import API_URL from '@/url'

// 获取任务列表
function getList(page) {
  return request({
    method: 'get',
    url: API_URL.getTaskList,
    params: {
      page
    }
  })
}

// 获取任务详情
function getDetail(id) {
  return request({
    method: 'get',
    url: API_URL.getTaskDetail,
    params: {
      id
    }
  })
}

export { getList, getDetail }
