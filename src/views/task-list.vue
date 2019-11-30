<template>
  <div class="list-wrapper">
    <m-header title="任务列表" :showBack="true"></m-header>
    <div class="container">
      <!-- 任务列表 -->
      <div class="wrapper">
        <div class="title">
          <p class="name">任务列表</p>
        </div>
        <div class="content">
          <div class="item" v-for="(item, index) of listData" :key="item.id">
            <p>
              <span class="name">序号</span>
              <span class="value">{{index + 1}}</span>
            </p>
            <p>
              <span class="name">标题</span>
              <span class="value" @click="goDetail(item.id)" style="color: #1895ff; text-decoration: underline;">{{item.title}}</span>
            </p>
            <p>
              <span class="inline-wrapper">
                <span class="name">下发时间</span>
                <span class="value">{{item.cratedTime}}</span>
              </span>
              <span class="inline-wrapper">
                <span class="name name2">处理部门</span>
                <span class="value value2">{{item.deptName}}</span>
              </span>
            </p>
            <p>
              <span class="inline-wrapper">
                <span class="name">处置状态</span>
                <span class="value">{{_transStatus(item.status)}}</span>
              </span>
              <span class="inline-wrapper">
                <span class="name name2">任务性质</span>
                <span class="value value2">{{_transProperty(item.desc)}}</span>
              </span>
            </p>
            <p>
              <span class="name">问题分类</span>
              <span class="value">{{item.qtype}}</span>
            </p>
          </div>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <span class="btn first" @click="_first"></span>
          <span class="btn prev" @click="_prev"></span>
          <input type="tel" class="current-page" v-model.lazy.number="u_currentPage">
          <span class="total-page">{{totalPage}}</span>
          <span class="btn next" @click="_next"></span>
          <span class="btn last" @click="_last"></span>
          <mt-button type="primary" size="small" @click.native="goPage">跳转</mt-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import MHeader from '@/components/m-header'
import { getList } from '@/api/task-list'
import { Indicator } from 'mint-ui'
import { formatTime2 } from '@/util/date'
export default {
  name: 'TaskList',
  components: {
    MHeader
  },
  data() {
    return {
      keyWords: '',
      gradeId: '',
      articleStatus: '',
      currentPage: 1,
      // 输入框数据
      u_currentPage: 1,
      size: 3,
      deptId: '',
      quesId: '',
      pid: '',
      totalPage: 1,
      listData: []
    }
  },
  methods: {
    // 从地图进来
    _getList(page) {
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      getList(page).then(resp => {
        this.currentPage = resp.page
        this.u_currentPage = resp.page
        this.totalPage = Math.ceil(resp.totalNumber / this.size)
        this.listData = resp.list
        Indicator.close()
      })
    },
    // 时间转换
    _transTime(stamp) {
      return formatTime2(new Date(stamp))
    },
    // 任务性质转换
    _transProperty(value) {
      if(value === 1) {
        return '一般'
      }
      if(value === 2) {
        return '重要'
      }
      if(value === 3) {
        return '紧急'
      }
    },
    // 处置状态转换
    _transStatus(value) {
      if(value === 0) {
        return '未受理'
      }
      if(value === 1) {
        return '受理中'
      }
      if(value === 2) {
        return '待审核'
      }
      if(value === 3) {
        return '已办结'
      } else {
        return '未知'
      }
    },
    // 翻页
    _first() {
      if(this.currentPage > 1) {
        this._getList(1)
      }
    },
    _prev() {
      if(this.currentPage > 1) {
        this.currentPage--
        this._getList(this.currentPage)
      }
    },
    _next() {
      if(this.currentPage < this.totalPage) {
        this.currentPage++
        this._getList(this.currentPage)
      }
    },
    _last() {
      if(this.currentPage < this.totalPage) {
        this._getList(this.totalPage)
      }
    },
    // 自定义输入跳转页码
    goPage() {
      if(this.u_currentPage > 0 && (this.totalPage >= this.u_currentPage)) {
        this._getList(this.u_currentPage)
      } else {
        this.u_currentPage = this.currentPage
      }
    },
    goDetail(articleId) {
      this.$router.push({
        path: '/task-detail',
        query: {
          articleId
        }
      })
    }
  },
  created() {
    let _query = this.$route.query
    let _from = _query.from
    if(_from === 'map') {
      this.deptId = _query.deptId
      this._getList(this.currentPage)
    }
    if(_from === 'overview') {
      this.deptId = _query.deptId
      this._getList(this.currentPage)
    }
    if(_from === 'search') {
      this.keyWords = _query.keyWords
      this.gradeId = _query.gradeId
      this.articleStatus = _query.articleStatus
      this.deptId = _query.deptId
      this._getList(this.keyWords, this.gradeId, this.articleStatus, this.currentPage, this.size, this.deptId)
    }
  }
}
</script>
<style scoped lang="stylus">
.list-wrapper
  .container
    padding 0 4%
    padding-bottom 70px
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
        box-shadow: -1px -1px 1px 0px rgba(228,236,242,1), 1px 1px 1px 0px rgba(228,236,242,1)
        .item
          border-top 1px solid #eee
          padding-top 5px
          padding-bottom 5px
          &:first-child
            border-top none
          p
            position relative
            padding 6px 0
            span.inline-wrapper
              display: inline-block;
              max-width: 50%;
              vertical-align top
              width 49%
            span.name
              position absolute
              display inline-block
              line-height 1.5
              color #888
              font-size 12px
              width 60px
            span.name2
              left 50%
            span.value
              display inline-block
              color #666
              line-height 1.2
              font-size 12px
              margin-left 60px
      .pagination
        margin-top 15px
        text-align right
        .current-page
          width 45px
          height 30px
          background-color #F0F0F0
          vertical-align bottom
          outline none
          text-indent 5px
          color #666
          text-align center
          font-size 14px
          margin-left 10px
          margin-top 5px
        .total-page
          display inline-block
          height 20px
          line-height 20px
          vertical-align middle
          margin-top 4px
          border-left 1px solid #666
          padding-left 5px
          color #666
          margin-left 5px
          margin-right 10px
        .btn
          display inline-block
          height 20px
          width 38px
          background-position center
          background-repeat no-repeat
          background-size contain
          vertical-align middle
        .first
          background-image url('~@/assets/images/icon-first.png')
        .prev
          background-image url('~@/assets/images/icon-prev.png')
        .next
          background-image url('~@/assets/images/icon-next.png')
        .last
          background-image url('~@/assets/images/icon-last.png')
        .mint-button--small
          padding 0 10px
</style>
