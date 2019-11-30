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
    desc: '@natural(1, 3)',
    qtype: '@ctitle(4)'
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
      if(Number(id) === 0) {
        return {
          code: -1,
          data: {
            message: '查找失败，Not id params'
          }
        }
      }
      let itemData = List.filter((item, index) => item.id === Number(id))[0]
      console.log(itemData)
      return {
        code: 0,
        data: {
          title: itemData.title,
          grade_name: itemData.desc,
          createdTime: itemData.cratedTime,
          dept_name: itemData.deptName,
          untreated: [{
            created_at: '2019-10-01 09:00:00',
            user_name: Mock.mock('@cname'),
            dept_name: itemData.deptName
          }, {
            created_at: '2019-10-01 09:00:00',
            user_name: Mock.mock('@cname'),
            dept_name: itemData.deptName
          }],
          treateing: [{
            created_at: '2019-10-01 09:00:00',
            user_name: Mock.mock('@cname'),
            dept_name: itemData.deptName
          }],
          audit: [{
            created_at: '2019-10-01 09:00:00',
            user_name: Mock.mock('@cname'),
            dept_name: itemData.deptName
          }],
          theEnd: [{
            created_at: '2019-10-01 09:00:00',
            user_name: Mock.mock('@cname'),
            dept_name: itemData.deptName
          }]
        }
      }
    }
  }
]
