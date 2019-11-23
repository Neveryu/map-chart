<template>
  <div class="overview-wrapper">
    <m-header title="我的任务" :showBackApp="true"></m-header>
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
        <!-- 我的全部任务概况 -->
        <div class="all">
          <div class="title">
            <p class="name">我的全部任务概况</p>
          </div>
          <div class="content open">
            <p class="name">全区</p>
            <!-- 切换按钮 -->
            <div class="tab-btn" @click="toggleStatClass"></div>
            <div class="detail">
              <!-- @click="goList('', '')" -->
              <div class="total count">
                <span class="name">任务总数</span>
                <span class="value">{{allData.totalCount}}</span>
              </div>
              <div class="total rate">
                <span class="name">任务办结率</span>
                <span class="value">{{allData.rate}}</span>
              </div>
              <div class="detail-item">
                <span class="name">各状态任务分布</span>
                <div class="detail-content">
                  <div class="item item1">
                    <span>已办结</span>
                    <span class="value">{{allData.theEnd}}</span>
                  </div>
                  <div class="item item2">
                    <span>受理中</span>
                    <span class="value">{{allData.untreating}}</span>
                  </div>
                  <div class="item item3">
                    <span>待审核</span>
                    <span class="value">{{allData.audit}}</span>
                  </div>
                  <div class="item item4">
                    <span>未受理</span>
                    <span class="value">{{allData.untreat}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 各部门任务概况 -->
        <div class="depart">
          <div class="title">
            <p class="name">各部门任务概况</p>
          </div>
          <div class="content" v-for="(item, index) of departData" :key="index">
            <p class="name">{{item.name}}</p>
            <!-- 切换按钮 -->
            <div class="tab-btn" @click="toggleStatClass"></div>
            <div class="detail">
              <!-- @click="goList(item.dept_id, '')" -->
              <div class="total count" >
                <span class="name">任务总数</span>
                <span class="value">{{item.totalCount}}</span>
              </div>
              <div class="total rate">
                <span class="name">任务办结率</span>
                <span class="value">{{item.rate}}</span>
              </div>
              <div class="detail-item">
                <span class="name">各状态任务分布</span>
                <div class="detail-content">
                  <div class="item item1">
                    <span>已办结</span>
                    <span class="value">{{item.theEnd}}</span>
                  </div>
                  <div class="item item2">
                    <span>受理中</span>
                    <span class="value">{{item.untreating}}</span>
                  </div>
                  <div class="item item3">
                    <span>待审核</span>
                    <span class="value">{{item.audit}}</span>
                  </div>
                  <div class="item item4">
                    <span>未受理</span>
                    <span class="value">{{item.untreat}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <m-bottom :currentMenu="1"></m-bottom>
    <div class="olay"></div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import MHeader from '@/components/m-header'
import MBottom from '@/components/m-bottom'
import { formatTime } from '@/util/date'
import { getAllStatus } from '@/api/overview'

export default {
  name: 'overview',
  components: {
    MHeader,
    MBottom
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
      allData: {},
      departData: []
    }
  },
  methods: {
    goList(deptId, articleStatus) {
      this.$router.push({
        path: '/task-list',
        query: {
          from: 'overview',
          deptId,
          articleStatus,
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
    },
    mintuiDate(time) {
      return new Date(time)
    },
    _hasClass(obj, cls) {
      return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
    },
    _addClass(obj, cls) {
      if(!this._hasClass(obj, cls)) obj.className += ' ' + cls
    },
    _removeClass(obj, cls) {
      if(this._hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        obj.className = obj.className.replace(reg, '')
      }
    },
    _toggleClass(obj, cls) {
      if(this._hasClass(obj, cls)) {
        this._removeClass(obj, cls)
      }else{
        this._addClass(obj, cls)
      }
    },
    // 切换显示状态【省略还是展开】
    toggleStatClass(e) {
      let _parent = e.target.parentNode
      this._toggleClass(_parent, 'open')
    },
    /* 解决页面层级相互影响滑动的问题 */
    handler(e) {
      e.preventDefault()
    },
    closeTouch() {
      document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, { passive: false }) // 阻止默认事件
    },
    openTouch() {
      document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, { passive: false }) // 打开默认事件
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
      this._getAllStatus(this.startTime, this.endTime)
    },
    handleEndChange(value) {
      this.endTime = formatTime(value)
      this.$refs.picker2.close()
      this.openTouch()
      this._getAllStatus(this.startTime, this.endTime)
    },
    handleVisibleChange(isVisible) {
      if(isVisible) {
        this.closeTouch()
      } else {
        this.openTouch()
      }
    },
    // 获取所有的状态数据
    _getAllStatus(startTime, endTime) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      getAllStatus(startTime, endTime).then(resp => {
        Indicator.close()
        console.log(resp)
        const respData = resp.data
        this.allData = respData.allData
        this.departData = respData.departData
        this.departData = this.departData.reverse()
      }).catch(err => {

      })
    }
  },
  created() {
    // 初始化7天
    this.startTime = this.mintStartTime = formatTime(new Date(new Date().valueOf() - 6 * 24 * 3600000))
    this.endTime = this.mintEndTime = formatTime(new Date())
    this._getAllStatus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.overview-wrapper
  .container
    // position absolute
    // width 100%
    // height 100vh
    // top 0
    // left 0
    padding-bottom 50px
    // overflow scroll
    .time
      margin-top 10px
      height 35px
      color #666
      font-size 14px
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
          background url('~@/assets/images/icon-time.png') left center no-repeat
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
          background url('~@/assets/images/icon-time.png') left center no-repeat
          background-size 14px
    .main
      margin-top 15px;
      color #333
      padding 0 4.5%
      font-size 14px
      .all, .depart
        .title
          height 20px
          margin-top 10px
          padding 0 0 5px 0
          .name
            font-size 16px
            border-left 4px solid #1895ff
            padding-left 5px
        .content
          position relative
          border 1px solid #E4ECF2
          padding 10px 12px
          font-size 14px
          background url('~@/assets/images/show-close.png') no-repeat
          background-position right 12px top 12px
          background-size 14px
          border-radius 6px
          margin-bottom 12px
          &.open
            background-image url('~@/assets/images/show-open.png')
            background-size 8px
            .detail
              display block
          .tab-btn
            position absolute
            display inline-block
            width 100%
            height 30px
            top 0
            right 0
          .detail
            display none
            margin-top 25px
            .total
              position relative
              display inline-block
              height 40px
              width 47%
              background url('~@/assets/images/lyrical-total-border.png') no-repeat
              background-position center
              background-size 100%
              vertical-align top
              text-align center
              .name
                position absolute
                top -5px
                left 5px
                font-size 12px
                color #1895ff
              .value
                display inline-block
                height 40px
                line-height 40px
                color #1895ff
                font-size 18px
            .rate
              margin-left 4%
              .name
                font-size 12px
            .detail-item
              margin-top 15px
              height 65px
              position relative
              .name
                display inline-block
                width 30%
                color #666
                font-size 12px
                word-break break-all
              .detail-content
                position absolute
                right 0
                top 0
                width 70%
                .item
                  display inline-block
                  box-sizing border-box
                  width 46%
                  height 25px
                  border-radius 3px
                  line-height 25px
                  padding 0 5px
                  font-size 12px
                  .value
                    float right
                .item1
                  color #00c051
                  border 1px solid #00c051
                .item2
                  color #1895ff
                  border 1px solid #1895ff
                  margin-left 5%
                .item3
                  color #edae09
                  border 1px solid #edae09
                  margin-top 10px
                .item4
                  color #ec5858
                  border 1px solid #ec5858
                  margin-top 10px
                  margin-left 5%
      .depart
        margin-top 20px
        // .title
        //   height 20px
        //   margin-top 10px
        //   padding 0 0 5px 0
        //   .name
        //     font-size 16px
        //     border-left 4px solid #1895ff
        //     padding-left 5px
        // .content
        //   border 1px solid #E4ECF2
        //   padding 10px 12px
        //   font-size 14px
        //   background url('/static/images/show-close.png') no-repeat
        //   background-position right 12px top 12px
        //   background-size 14px
        //   border-radius 6px
</style>
