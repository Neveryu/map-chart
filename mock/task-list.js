import Mock from 'mockjs'

const count = 10
const List = []

for(let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@title(5, 10)',
    cratedTime: '@datetime',
    deptName: '@first',
    status: 1,
    name: '@first',
    pname: '@first'
  }))
}

export default [
  {
    url: '/mobile/getTaskList',
    type: 'get',
    response: config => {
      const { page = 1 } = config.query
      let size = 3

      let mockList = List.filter((item, index) => {
        if(index < 3) {
          return true
        }
      })

      let totalNumber = 100
      let list = List
      return {
        code: 0,
        data: {
          page,
          totalNumber,
          list: mockList
        }
      }
    }
  }
]
