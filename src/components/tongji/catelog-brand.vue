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
  name: 'catelog-brand',
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
      msg: 'yy'
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
          left: 95,
          top: 10,
          bottom: 30,
          right: 15
        },
        xAxis: {
          type: 'value',
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
            fontSize: 12,
            formatter: '{value}'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
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
            fontSize: 12
          },
          // 不显示每一行的刻度线
          splitLine: {
            show: false
          },
          data: this.yData
        },
        series: [
          {
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
                    color: '#0286ff' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#85C7FF' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
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
