<template>
  <div class="detail-wrapper">
    <m-header title="任务详情" :showBack="true"></m-header>
    <div class="container">
      <!-- 任务处理详情 -->
      <div class="wrapper">
        <div class="title">
          <p class="name">任务处理详情</p>
        </div>
        <div class="content">
          <div class="item">
            <p>
              <span class="name">任务：</span>
              <span class="value">{{title}}</span>
            </p>
            <p>
              <span class="inline-wrapper1">
                <span class="name">任务性质：</span>
                <span class="value">{{gradeName}}</span>
              </span>
              <span class="inline-wrapper2">
                <span class="name name2">发起时间：</span>
                <span class="value value2">{{time}}</span>
              </span>
            </p>
            <p>
              <span class="name">处理部门：</span>
              <span class="value">{{deptName}}</span>
            </p>
          </div>

          <!-- 流程 -->
          <div class="flow">
            <!-- 添加任务 -->
            <div class="flow-item find" v-for="(item, index) of untreated" :key="item.id">
              <div class="left">
                <span class="name" v-if="index === 0">添加任务</span>
              </div>
              <div class="right">
                <p class="time">{{_formatTime(item.created_at)}}</p>
                <p class="status">
                  <span>处理状态：</span>
                  <span class="status-value">未处理</span>
                </p>
                <p class="people">
                  <span>处理人员：</span>
                  <span class="value">{{item.user_name}}</span>
                </p>
                <p class="depart">
                  <span>处理部门：</span>
                  <span class="value">{{item.dept_name}}</span>
                </p>
              </div>
            </div>

            <!-- 任务处理 -->
            <div class="flow-item process" v-for="(item, index) of treateing" :key="item.id">
              <div class="left">
                <span class="name" v-if="index === 0">任务处理</span>
              </div>
              <div class="right">
                <p class="time">{{_formatTime(item.created_at)}}</p>
                <p class="status">
                  <span>处理状态：</span>
                  <span class="status-value">处理中</span>
                </p>
                <p class="people">
                  <span>处理人员：</span>
                  <span class="value">{{item.user_name}}</span>
                </p>
                <p class="depart">
                  <span>处理部门：</span>
                  <span class="value">{{item.dept_name}}</span>
                </p>
              </div>
            </div>

            <!-- 任务审核 -->
            <div class="flow-item review" v-for="(item, index) of audit" :key="item.id">
              <div class="left">
                <span class="name" v-if="index === 0">任务审核</span>
              </div>
              <div class="right">
                <p class="time">{{_formatTime(item.created_at)}}</p>
                <p class="status">
                  <span>处理状态：</span>
                  <span class="status-value">申请归档</span>
                </p>
                <p class="people">
                  <span>处理人员：</span>
                  <span class="value">{{item.user_name}}</span>
                </p>
                <p class="depart">
                  <span>处理部门：</span>
                  <span class="value">{{item.dept_name}}</span>
                </p>
              </div>
            </div>

            <!-- 任务完结 -->
            <div class="flow-item final" v-for="(item, index) of theEnd" :key="item.id">
              <div class="left">
                <span class="name" v-if="index === 0">任务完结</span>
              </div>
              <div class="right">
                <p class="time">{{_formatTime(item.created_at)}}</p>
                <p class="status">
                  <span>处理状态：</span>
                  <span class="status-value">已完成</span>
                </p>
                <p class="people">
                  <span>处理人员：</span>
                  <span class="value">{{item.user_name}}</span>
                </p>
                <p class="depart">
                  <span>处理部门：</span>
                  <span class="value">{{item.dept_name}}</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import MHeader from '@/components/m-header'
import { getDetail } from '@/api/task-list'
import { formatTime2 } from '@/util/date'
export default {
  name: 'TaskDetail',
  components: {
    MHeader
  },
  data() {
    return {
      articleId: 0,
      title: '',
      gradeName: '',
      time: '',
      deptName: '',
      // 发现舆情 & 未处置舆情
      untreated: [],
      // 舆情受理 & 受理阶段
      treateing: [],
      // 舆情审核 & 待审核
      audit: [],
      // 舆情办结 & 已办结
      theEnd: []
    }
  },
  methods: {
    _getDetail(id) {
      getDetail(id).then(resp => {
        this.title = resp.title
        this.gradeName = resp.grade_name
        this.time = formatTime2(new Date(resp.createdTime))
        this.deptName = resp.dept_name
        // 发现舆情 & 未处置舆情
        this.untreated = resp.untreated
        // 舆情受理 & 受理阶段
        this.treateing = resp.treateing
        // 舆情审核 & 待审核
        this.audit = resp.audit
        // 舆情办结 & 已办结
        this.theEnd = resp.theEnd
      })
    },
    // 时间格式化
    _formatTime(stamp) {
      return formatTime2(new Date(stamp))
    }
  },
  created() {
    let _query = this.$route.query
    this.articleId = _query.articleId
    this._getDetail(this.articleId)
  }
}
</script>
<style scoped lang="stylus">
.detail-wrapper
  padding-bottom 30px
  .container
    padding 0 4%
    .wrapper
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
        min-height 200px
        padding 2%
        border-radius: 4px
        box-shadow: -1px -1px 2px 0px rgba(228,236,242,1), 1px 1px 2px 0px rgba(228,236,242,1)
        .item
          border-top 1px solid #eee
          padding-top 5px
          padding-bottom 5px
          &:first-child
            border-top none
          p
            position relative
            padding 6px 0
            span.inline-wrapper1
              display: inline-block
              max-width: 40%
              vertical-align top
              width 39%
            span.inline-wrapper2
              display: inline-block
              max-width: 60%
              vertical-align top
              width 59%
            span.name
              position absolute
              display inline-block
              line-height 1.5
              color #888
              font-size 12px
              width 60px
            span.name2
              left 40%
            span.value
              display inline-block
              color #333
              line-height 1.2
              font-size 12px
              margin-left 60px
        .flow
          border-top 1px solid #eee
          padding-top 10px
          .flow-item
            .left
              display inline-block
              width 70px
              vertical-align top
              .name
                font-size 14px
                color #1895FF
            .right
              position relative
              display inline-block
              vertical-align top
              font-size 14px
              color #888
              border-left 1px solid rgba(24,149,255,.6)
              padding-left 15px
              padding-bottom 10px
              &:before
                position absolute
                top 0
                left -7px
                display block
                width 8px
                height 8px
                content: ''
                border 2px solid #1895FF
                border-radius 50%
                background #fff
              p
                padding 5px 0
                &:first-child
                  padding-top 0
                span.value
                  color #333
          .find
            .status-value
              color #EC5858
          .process
            .status-value
              color #1895FF
          .review
            .status-value
              color #EDAE09
          .final
            .status-value
              color #00C051
</style>
