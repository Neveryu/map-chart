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
  name: 'area-brand',
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
  data() {
    return {
      xx: 'xx'
    }
  },
  methods: {
    initChart() {
      this.charts = echarts.init(this.$el)
      this.charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            lineStyle: {
              width: 2
            }
          }
        },
        grid: {
          left: 35,
          top: 30,
          bottom: 25,
          right: 1
        },
        xAxis: {
          type: 'category',
          // 两边是否留白
          boundaryGap: true,
          axisLine: {
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
            fontSize: 10
          },
          // splitLine: {
          //   show: false
          // },
          data: this.xData
        },
        yAxis: {
          name: '(件)',
          type: 'value',
          // max: 10,
          axisLine: {
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
            formatter: '{value}'
          },
          // 不显示每一行的刻度线
          splitLine: {
            show: false
          }
        },
        series: [
          {
            data: this.yData,
            type: 'bar',
            barWidth: '10',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 10, 10],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#FFD6DC'
                    },
                    {
                      offset: 1,
                      color: '#f56'
                    }
                  ]
                )
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
  created() {},
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
