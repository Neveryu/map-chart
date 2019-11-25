import { points } from '../src/util/baoan-map'
import { mapData } from './task'
import Mock from 'mockjs'

const List = []

export default [{
  url: '/mobile/getTongji',
  type: 'get',
  response: config => {
    const { startTime, endTime } = config.query
    let areaXData = []
    points.forEach(item => {
      areaXData.push(item.name)
    })
    let data = {
      date: ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07'],
      total: [22, 33, 44, 55, 33, 90, 66],
      untreat: [22, 33, 44, 55, 33, 90, 66],
      audit: [11, 22, 33, 44, 55, 44, 22],
      untreating: [23, 34, 45, 56, 67, 12, 23],
      untreat: [44, 66, 88, 22, 33, 44, 10],
      areaXData,
      areaYData: mapData,
      typeDetail: [{
        name: '语文',
        number: 100,
        children: [
          {
            name: '四年级',
            number: 50
          },
          {
            name: '五年级',
            number: 111
          }
        ]
      }, {
        name: '数学',
        number: 120,
        children: [{
          name: '高数',
          number: 60
        }, {
          name: '线性代数',
          number: 60
        }]
      }, {
        name: '英语',
        number: 88
      }, {
        name: '化学',
        number: 77
      }, {
        name: '生物',
        number: 100
      }]
    }
    return {
      code: 0,
      data
    }
  }
}]
