<template>
  <div class="tongji-wrapper">
    <m-header title="任务统计" :showBackApp="true"></m-header>
    <div class="container">
      <!-- 时间选择器 -->
      <div class="time">
        <div class="start" @click="openStartPicker">
          <span class="pick">{{startTime}}</span>
        </div>
        <mt-datetime-picker
          ref="picker1"
          type="date"
          v-model=mintStartTime
          :startDate=fStartDate
          :endDate=fEndDate
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
          v-model=mintEndTime
          :startDate=lStartDate
          :endDate=lEndDate
          :closeOnClickModal="true"
          @visible-change="handleVisibleChange"
          @confirm="handleEndChange">
        </mt-datetime-picker>
      </div>
      <!-- 主要内容部分 -->
      <div class="main">
        <!-- 统计任务概况 -->
        <div class="content-item">
          <div class="title">
            <p class="name">任务数量趋势</p>
          </div>
          <div class="content">
            <trend width="100%" height="100%" :x-data="trendXData" :y-data="trendYData"></trend>
          </div>
        </div>

        <!-- 各状态任务趋势对比 -->
        <div class="content-item">
          <div class="title">
            <p class="name">各状态任务趋势对比</p>
          </div>
          <div class="content">
            <trend-compare width="100%" height="100%" :x-data="trendXData" :y-data="trendCompareData"></trend-compare>
          </div>
        </div>

        <!-- 任务区域分布 -->
        <div class="content-item">
          <div class="title">
            <p class="name">任务区域分布</p>
          </div>
          <div class="content">
            <area-brand width="100%" height="100%" :x-data="areaXData" :y-data="areaYData"></area-brand>
          </div>
        </div>

        <!-- 任务类别分布 -->
        <div class="content-item">
          <div class="title">
            <p class="name">任务类别分布</p>
          </div>
          <div class="content">
            <catelog-brand width="100%" height="100%" :x-data="catelogXData" :y-data="catelogYData"></catelog-brand>
          </div>
        </div>

        <!-- 任务细分类别分布 -->
        <div class="content-item">
          <div class="title">
            <p class="name">任务细分类别分布</p>
          </div>
          <div class="content" style="height: auto;">
            <detail-catelog width="100%" height="100%" :table-data="detailCatelogData"></detail-catelog>
          </div>
        </div>

        <!-- 任务数量部门排行 -->
        <div class="content-item">
          <div class="title">
            <p class="name">任务数量部门排行</p>
          </div>
          <div class="content">
            <depart-sort width="100%" height="100%" :table-data="departData"></depart-sort>
          </div>
        </div>

        <!-- 任务办结率部门排行TOP5 -->
        <div class="content-item">
          <div class="title">
            <p class="name">办结率部门排行TOP5</p>
          </div>
          <div class="content" style="height: 160px;">
            <rate-sort width="100%" height="100%" :x-data="rateXData" :y-data="rateYData"></rate-sort>
          </div>
        </div>

      </div>
    </div>
    <m-bottom :currentMenu="3"></m-bottom>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import MHeader from '@/components/m-header'
import MBottom from '@/components/m-bottom'
// 时间格式化工具
import { formatTime } from '@/util/date'
// 任务趋势
import Trend from '@/components/tongji/trend'
// 各状态任务趋势对比
import TrendCompare from '@/components/tongji/trend-compare'
// 任务区域分布
import AreaBrand from '@/components/tongji/area-brand'
// 任务类别分布
import CatelogBrand from '@/components/tongji/catelog-brand'
// 任务细分类别分布
import DetailCatelog from '@/components/tongji/detail-catelog'
// 任务数量部门排行
import DepartSort from '@/components/tongji/depart-sort'
// 任务办结率部门排行TOP5
import RateSort from '@/components/tongji/rate-sort'

// 接口
import { getTongjiData } from '@/api/tongji'

export default {
  name: 'tongji',
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
      // 开始时间，日期的最小可选值
      fStartDate: new Date('2010-01-01'),
      fEndDate: new Date(),
      lStartDate: new Date('2010-01-01'),
      lEndDate: new Date(),
      startTime: '',
      mintStartTime: '',
      endTime: '',
      mintEndTime: '',
      topBy: '',
      // 任务趋势时间&各状态任务趋势对比时间
      trendXData: [],
      // 任务趋势数据
      trendYData: [],
      // 各状态任务趋势对比数据
      trendCompareData: {},
      // 任务类别分布y轴类目
      catelogYData: [],
      // 任务类别分布x轴数据
      catelogXData: [],
      detailCatelogData: [],
      // 部门量&办结率数据
      departData: [],
      // 办结率y轴数据
      rateYData: [],
      // 办结率x轴数据
      rateXData: [],
      // 区域分布x轴数据
      areaXData: [],
      // 区域分布y轴数据
      areaYData: []
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
      // 改变时间获取数据
      this._getStatusList()
      this._getArea(this.startTime, this.endTime)
      this._getCatelog(this.startTime, this.endTime)
      this._getDepartTop(this.startTime, this.endTime, this.topBy)
    },
    handleEndChange(value) {
      this.endTime = formatTime(value)
      this.$refs.picker2.close()
      this.openTouch()
      // 改变时间获取数据
      this._getStatusList()
      this._getArea(this.startTime, this.endTime)
      this._getCatelog(this.startTime, this.endTime)
      this._getDepartTop(this.startTime, this.endTime, this.topBy)
    },
    handleVisibleChange(isVisible) {
      if(isVisible) {
        this.closeTouch()
      } else {
        this.openTouch()
      }
    },
    // 统计的后两个图表
    _getDepartTop(startTime, endTime, topBy) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      this.rateYData = []
      this.rateXData = []
      getDepartTop(startTime, endTime, topBy).then(resp => {
        let respData = resp.data
        // clone
        let _respData = JSON.parse(JSON.stringify(resp.data))
        this.departData = _respData.data.sort((a, b) => {
          return b.all - a.all
        })
        console.log(this.departData)
        // respData.data.forEach((v, i, _this) => {
        //   this.rateYData.push(v.deptName)
        //   this.rateXData.push(v.percentage)
        // })
        // 办结率部门前5
        for(let i = 0; i < 5; i++) {
          this.rateYData.push(respData.data[i].deptName)
          var percentage = respData.data[i].percentage
          this.rateXData.push(percentage.substring(0, percentage.length - 1))
        }
        Indicator.close()
      })
    },
    // 任务类别&任务细分类别
    _getCatelog(startTime, endTime) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      this.catelogYData = []
      this.catelogXData = []
      getCatelog(startTime, endTime).then(resp => {
        // console.log(resp)
        let respData = resp.data
        let srcCatelogData = respData.data
        this.detailCatelogData = srcCatelogData
        srcCatelogData.forEach((v, i, _this) => {
          this.catelogYData.push(v.quesName)
          this.catelogXData.push(v.all)
        })
        Indicator.close()
      })
    },
    getDataList() {
      getTongjiData().then(res => {
        this.trendXData = res.date
        this.trendYData = res.total
        this.trendCompareData = {
          // 已办结
          'step4': res.theEnd,
          // 待审核
          'step3': res.audit,
          // 受理中
          'step2': res.untreating,
          // 未受理
          'step1': res.untreat
        }
        this.areaXData = res.areaXData
        this.areaYData = res.areaYData
        this.detailCatelogData = res.typeDetail
      })
    }
  },
  created() {
    // 初始化7天
    this.startTime = this.mintStartTime = formatTime(new Date(new Date().valueOf() - 6 * 24 * 3600000))
    this.endTime = this.mintEndTime = formatTime(new Date())
    this.getDataList()
    // this._getStatusList()
    // this._getArea()
    // this._getDepartTop()
    // this._getCatelog()
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
