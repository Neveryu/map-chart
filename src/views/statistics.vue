<template>
  <div class="tongji-wrapper">
    <m-header title="任务统计"></m-header>
    <div class="container">
      <!-- 时间选择器 -->
      <div class="time">
        <div class="start" @click="openStartPicker">
          <span class="pick">{{startTime}}</span>
        </div>
        <mt-datetime-picker
          ref="picker1"
          type="date"
          :closeOnClickModal="true"
          @visible-change="handleVisibleChange"
          @confirm="handleStartChange">
        </mt-datetime-picker>
        <span class="split">至</span>
        <div class="end" @click="openEndPicker">
          <span class="pick">{{endTime}}</span>
        </div>
        <mt-datetime-picker
          ref="picker2"
          type="date"
          :closeOnClickModal="true"
          @visible-change="handleVisibleChange"
          @confirm="handleEndChange">
        </mt-datetime-picker>
      </div>
      <!-- 主要内容部分 -->
      <div class="main">
        <!-- 全区舆情督办概况 -->
        <div class="content-item">
          <div class="title">
            <p class="name">舆情趋势</p>
          </div>
          <div class="content">
            <trend width="100%" height="100%"></trend>
          </div>
        </div>

        <!-- 各状态舆情趋势对比 -->
        <div class="content-item">
          <div class="title">
            <p class="name">各状态舆情趋势对比</p>
          </div>
          <div class="content">
            <trend-compare width="100%" height="100%"></trend-compare>
          </div>
        </div>

        <!-- 舆情区域分布 -->
        <div class="content-item">
          <div class="title">
            <p class="name">舆情区域分布</p>
          </div>
          <div class="content">
            <area-brand width="100%" height="100%"></area-brand>
          </div>
        </div>

        <!-- 舆情类别分布 -->
        <div class="content-item">
          <div class="title">
            <p class="name">舆情类别分布</p>
          </div>
          <div class="content">
            <catelog-brand width="100%" height="100%"></catelog-brand>
          </div>
        </div>

        <!-- 舆情细分类别分布 -->
        <div class="content-item">
          <div class="title">
            <p class="name">舆情细分类别分布</p>
          </div>
          <div class="content" style="height: auto;">
            <detail-catelog width="100%" height="100%"></detail-catelog>
          </div>
        </div>

        <!-- 舆情量部门排行 -->
        <div class="content-item">
          <div class="title">
            <p class="name">舆情量部门排行</p>
          </div>
          <div class="content" style="height: auto;">
            <depart-sort width="100%" height="100%"></depart-sort>
          </div>
        </div>

        <!-- 办结率部门排行TOP5 -->
        <div class="content-item">
          <div class="title">
            <p class="name">办结率部门排行TOP5</p>
          </div>
          <div class="content" style="height: 160px;">
            <rate-sort width="100%" height="100%"></rate-sort>
          </div>
        </div>

      </div>
    </div>
    <m-bottom :currentMenu="3"></m-bottom>
  </div>
</template>

<script>
import MHeader from '@/components/m-header'
import MBottom from '@/components/m-bottom'
// 时间格式化工具
// import { formatTime } from '@/util/date'
// 舆情趋势
// import Trend from '@/chart-components/trend'
// 各状态舆情趋势对
// import TrendCompare from '@/chart-components/trend-compare'
// 舆情区域分布
// import AreaBrand from '@/chart-components/area-brand'
// 舆情类别分布
// import CatelogBrand from '@/chart-components/catelog-brand'
// 舆情细分类别分布
// import DetailCatelog from '@/chart-components/detail-catelog'
// 舆情量部门排行
// import DepartSort from '@/chart-components/depart-sort'
// 办结率部门排行TOP5
// import RateSort from '@/chart-components/rate-sort'
export default {
  name: 'statistics',
  components: {
    MHeader,
    MBottom,
    Trend,
    TrendCompare,
    AreaBrand,
    CatelogBrand,
    DetailCatelog,
    DepartSort,
    RateSort
  },
  data () {
    return {
      startTime: '',
      endTime: ''
    }
  },
  methods: {
    /* 解决页面层级相互影响滑动的问题 */
    handler(e) {
      e.preventDefault()
    },
    closeTouch() {
      // 阻止默认事件
      document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {passive: false})
    },
    openTouch() {
      // 打开默认事件
      document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {passive: false})
    },
    openStartPicker() {
      this.$refs.picker1.open()
      this.closeTouch()
    },
    openEndPicker() {
      this.$refs.picker2.open()
      this.closeTouch()
    },
    handleStartChange(value) {
      this.startTime = formatTime(value)
      this.$refs.picker1.close()
      this.openTouch()
    },
    handleEndChange(value) {
      this.endTime = formatTime(value)
      this.$refs.picker2.close()
      this.openTouch()
    },
    handleVisibleChange(isVisible) {
      if(isVisible) {
        this.closeTouch()
      } else {
        this.openTouch()
      }
    }
  },
  created() {
    this.startTime = formatTime(new Date())
    this.endTime = formatTime(new Date())
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.tongji-wrapper
  .container
    // position absolute
    // width 100%
    // height 100vh
    // top 0
    // left 0
    padding-bottom 70px
    // overflow scroll
    .time
      margin-top 10px
      height 35px
      color #666
      font-size 14px
      border-bottom 1px solid #eee
      .start
        float left
        width 47%
        height 35px
        text-align center
        .pick
          display inline-block
          width 100px
          height 35px
          line-height 35px
          padding-left 10px
          background url('/static/images/icon-time.png') left center no-repeat
          background-size 14px
      .split
        display inline-block
        width 6%
        height 35px
        line-height 35px
      .end
        float right
        width 47%
        height 35px
        text-align center
        .pick
          display inline-block
          width 100px
          height 35px
          line-height 35px
          padding-left 10px
          background url('/static/images/icon-time.png') left center no-repeat
          background-size 14px
    .main
      margin-top 15px;
      color #333
      padding 0 4.5%
      font-size 14px
      .content-item
        margin-top 20px
        .title
          height 20px
          padding 0 0 5px 0
          .name
            font-size 16px
            border-left 4px solid #1895ff
            padding-left 5px
        .content
          border 1px solid #eee
          height 200px
          border-radius: 4px
          box-shadow: -1px -1px 8px 1px rgba(228,236,242,1), 1px 1px 8px 1px rgba(228,236,242,1)
</style>
