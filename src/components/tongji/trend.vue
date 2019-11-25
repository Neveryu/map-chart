<template>
  <div></div>
</template>
<script>
import { debounce } from '@/util/debounce'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
export default {
  name: 'trend',
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
      y: 'yyuu'
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
          right: 15
        },
        xAxis: {
          type: 'category',
          // 两边是否留白
          boundaryGap: false,
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
            color: '#666'
          },
          // splitLine: {
          //   show: false
          // },
          data: this.xData
        },
        yAxis: {
          name: '(个)',
          type: 'value',
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
        series: [{
          name: '任务数量',
          data: this.yData,
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#85C7FF',
              lineStyle: {
                color: '#85C7FF'
              }
            }
          },
          areaStyle: {}
        }]
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
    // console.log(this.xData)
    // console.log(this.yData)
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
