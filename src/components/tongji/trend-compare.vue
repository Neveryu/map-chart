<template>
  <div></div>
</template>
<script>
import { debounce } from '@/util/debounce'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default {
  name: 'trend-compare',
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
      type: Object,
      required: true,
      default: () => {
        return {}
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
        legend: {
          data: ['已办结', '待审核', '受理中', '未受理'],
          icon: 'circle',
          right: 10,
          itemGap: 1,
          itemWidth: 10,
          textStyle: {
            fontSize: 10
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
            interval: 0
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
            name: '已办结',
            data: this.yData.step4,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#00C051',
                lineStyle: {
                  color: '#00C051'
                }
              }
            }
          },
          {
            name: '待审核',
            data: this.yData.step3,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FED218',
                lineStyle: {
                  color: '#FED218'
                }
              }
            }
          },
          {
            name: '受理中',
            data: this.yData.step2,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#1895FF',
                lineStyle: {
                  color: '#1895FF'
                }
              }
            }
          },
          {
            name: '未受理',
            data: this.yData.step1,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#F47A53',
                lineStyle: {
                  color: '#F47A53'
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
