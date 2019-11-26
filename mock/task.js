import Mock from 'mockjs'

const count = 10
const List = []

// overview-list-data
let temp = null

// map data
const mapData = []
for(let i = 0; i < 10; i++) {
  mapData.push(Mock.mock('@natural(60, 799)'))
}

for(let i = 0; i < count; i++) {
  temp = Mock.mock({
    id: '@increment',
    name: '@city()',
    totalCount: '',
    rate: '',
    theEnd: '@natural(0, 999)',
    untreating: '@natural(0, 300)',
    audit: '@natural(0, 200)',
    untreat: '@natural(0, 100)'
  })
  temp.totalCount = temp.theEnd + temp.untreating + temp.audit + temp.untreat
  temp.rate = (temp.theEnd * 100 / temp.totalCount).toFixed(2) + '%'
  List.push(temp)
}

export { mapData }
export default [
  {
    url: '/mobile/getStatusByArea',
    type: 'get',
    response: config => {
      const { startTime, endTime } = config.query
      let allData = {
        totalCount: 0,
        rate: '',
        theEnd: 0,
        untreating: 0,
        audit: 0,
        untreat: 0
      }
      List.forEach(item => {
        allData.totalCount += item.totalCount
        allData.theEnd += item.theEnd
        allData.untreating += item.untreating
        allData.audit += item.audit
        allData.untreat += item.untreat
      })
      allData.rate = (allData.theEnd * 100 / allData.totalCount).toFixed(2) + '%'
      return {
        code: 0,
        data: {
          allData,
          departData: List
        }
      }
    }
  },
  {
    url: '/mobile/getArea',
    type: 'get',
    response: config => {
      const { startTime, endTime } = config.query
      return {
        code: 0,
        data: mapData
      }
    }
  }
]
