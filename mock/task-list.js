import Mock from 'mockjs'

const count = 100
const List = []

for(let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@cparagraph(1)',
    cratedTime: '@datetime',
    'deptName|1': ['测试部', '研发部', '产品部', '销售部', '行政部', '运营部'],
    status: '@natural(0, 3)',
    name: '@natural(1, 3)',
    pname: '@ctitle(4)'
  }))
}

export default [
  {
    url: '/mobile/getTaskList',
    type: 'get',
    response: config => {
      const { page = 1 } = config.query
      // 每页3条
      let size = 3
      let mockList = List

      const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))

      return {
        code: 0,
        data: {
          page,
          totalNumber: count,
          list: pageList
        }
      }
    }
  },
  {
    url: '/mobile/getDetail',
    type: 'get',
    response: config => {
      const { id = 0 } = config.query
      if(id === 0) {
        return {
          code: -1,
          data: {
            message: '查找失败，Not id params'
          }
        }
      }

      return {
        code: 0,
        data: {
          title: 'wwwwwwww',
          grade_name: 'sidfsdfw',
          createdTime: 1122994564000,
          dept_name: 'sfwer',
          untreated: [{
            created_at: 1122994564000,
            user_name: 'oooooo',
            dept_name: '22222222'
          }, {
            created_at: 1122994564000,
            user_name: 'oooooo',
            dept_name: '22222222'
          }],
          treateing: [{
            created_at: 1122994564000,
            user_name: 'oooooo',
            dept_name: '22222222'
          }],
          audit: [{
            created_at: 1122994564000,
            user_name: 'oooooo',
            dept_name: '22222222'
          }],
          theEnd: [{
            created_at: 1122994564000,
            user_name: 'oooooo',
            dept_name: '22222222'
          }]
        }
      }
    }
  }
]
