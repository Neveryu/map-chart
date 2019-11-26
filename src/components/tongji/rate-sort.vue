<template>
  <div></div>
</template>
<script>
import { debounce } from '@/util/debounce'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default {
  name: 'rate-sort',
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    xData: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    yData: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  methods: {
    initChart() {
      this.charts = echarts.init(this.$el)
      this.charts.setOption({
        tooltip: {
          // trigger: 'axis',
          // axisPointer: {
          //   type: 'shadow',
          //   lineStyle: {
          //     width: 2
          //   }
          // }
        },
        grid: {
          left: 55,
          top: 10,
          bottom: 12,
          right: 50
        },
        xAxis: {
          type: 'value',
          // 两边是否留白
          boundaryGap: true,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          // 刻度
          axisTick: {
            show: false
          },
          // 刻度文字
          axisLabel: {
            show: false,
            color: '#666',
            fontSize: 12,
            formatter: '{value}%'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            // max: 10,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ccc'
              }
            },
            // 刻度
            axisTick: {
              show: false
            },
            // 刻度文字
            axisLabel: {
              color: '#666',
              fontSize: 12,
              rotate: 25
            },
            // 不显示每一行的刻度线
            splitLine: {
              show: false
            },
            data: this.yData
          },
          {
            show: true,
            inverse: true,
            data: this.xData,
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 14,
                color: '#1895FF'
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '胜率',
            data: this.xData,
            type: 'bar',
            barWidth: '10',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 10, 10],
                color: {
                  colorStops: [{
                    offset: 0,
                    color: '#00EAAE' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#00FFAA' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          },
          {
            name: 'yy',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [100, 100, 100, 100, 100],
            itemStyle: {
              normal: {
                color: 'none'
                // borderColor: '#00c1de',
                // borderWidth: 0,
                // barBorderRadius: 15,
              }
            }
          }
        ]
      })
    }
  },
  watch: {
    xData() {
      this.initChart()
    },
    yData() {
      this.initChart()
    }
  },
  created() {
    // console.log(this.tableData)
    // this.tableData.forEach((v, i, _this) => {
    //   this.yData.push(v.deptName)
    //   this.xData.push(v.percentage)
    // })
  },
  mounted() {
    this.$el.style.width = this.width
    this.$el.style.height = this.height
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.charts) {
        this.charts.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
    this.__resizeHanlder()
  }
}
</script>
