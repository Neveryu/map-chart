<template>
  <div class="search-wrapper">
    <m-header title="高级查询" :showSearch="false" :showBack="true"></m-header>
    <div class="container">
      <div class="input-wrapper">
        <input type="text" class="search" v-model.trim="searchName" @keyup.enter="doSearch" placeholder="输入关键字... ">
        <div class="btn-search" @click="doSearch"></div>
      </div>
      <div class="hot-wrapper">
        <span class="title">热词</span>
        <ul class="hotlabel-wrapper">
          <li class="hot-item" v-for="(item, index) of hotLabel" :key="index" @click="addLabel(item.k)">{{item.k}}</li>
        </ul>
      </div>
      <hr class="split">
      <div class="result-wrapper">
        <span class="title">搜索结果</span>
        <div class="mt-loadmore-wrapper">
          <mt-loadmore
            ref="loadmore"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :autoFill="false"
            :distanceIndex="3">
            <ul class="result-list-wrapper">
              <li @click="clickItem(item)" class="result-item" v-for="(item, index) of resultList">{{ item.songname }}</li>
            </ul>
          </mt-loadmore>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Indicator, Toast } from 'mint-ui'
import MHeader from '@/components/m-header'
import { getHotTag, search } from '@/api/search'
export default {
  name: 'search',
  components: {
    MHeader
  },
  data() {
    return {
      searchName: '',
      hotLabel: [],
      resultList: [],
      pageSize: 20,
      showSinger: true,
      currentPage: 1,
      allLoaded: false
    }
  },
  methods: {
    clickItem(item) {
      alert(1)
    },
    loadBottom() {
      this.currentPage++
      search(this.searchName, this.currentPage, this.showSinger, this.pageSize).then(res => {
        res.data.song.list.forEach(item => {
          this.resultList.push(item)
        })
        this.$refs.loadmore.onBottomLoaded()
      })
    },
    addLabel(value) {
      this.searchName = value
      this.doSearch()
    },
    // 搜索按钮
    doSearch() {
      this.resultList = []
      if(this.searchName.length < 1) {
        return false
      }
      search(this.searchName, this.currentPage, this.showSinger, this.pageSize).then(res => {
        res.data.song.list.forEach(item => {
          this.resultList.push(item)
        })
      })
    },
    // 获取有哪些热词
    _getHotTag() {
      // todo
      getHotTag().then(res => {
        // this.hotLabel = res.data.hotkey
        if(res.data.hotkey && res.data.hotkey.length > 10) {
          this.hotLabel = res.data.hotkey.slice(0, 10)
        } else {
          this.hotLabel = res.data.hotkey || []
        }
      })
    },
    goList(keyWords, gradeId, articleStatus, page, size, deptId, startTime, endTime, quesId, pid) {
      this.$router.push({
        path: '/task-list',
        query: {
          from: 'search',
          keyWords,
          gradeId,
          articleStatus,
          page,
          size,
          deptId,
          startTime,
          endTime,
          quesId,
          pid
        }
      })
    }
  },
  created() {
    // 获取热词
    this._getHotTag()
  }
}
</script>
<style scoped lang="stylus">
.search-wrapper
  .container
    padding 0 4%
    // position fixed
    left 0
    right 0
    .input-wrapper
      position relative
      margin-top 10px
      height 35px
      border 1px solid #E4ECF2
      border-radius 25px
      background #fff
      box-shadow 2px 2px 8px 2px rgba(228,236,242,1)
      .search
        margin-left 10px
        width 80%
        height 35px
        color #b3b3b3
        font-size 14px
        text-indent 2px
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
      .btn-search
        position absolute
        top 0
        right 0
        height 35px
        width 35px
        background-image url('~@/assets/images/search.png')
        background-repeat no-repeat
        background-position right 15px center
        background-size 50%
    .result-wrapper
      margin-top 10px
      .title
        font-size 14px
        color red
      .mt-loadmore-wrapper
        height calc(100vh - 310px)
        overflow-y auto
        margin-top 10px
        &::-webkit-scrollbar
          display none  // Safari and Chrome
        .result-list-wrapper
          .result-item
            color #888
            padding 10px
            font-size 16px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
    .hot-wrapper
      margin-top 10px
      .title
        font-size 14px
        color #666
      .hotlabel-wrapper
        display inline-flex
        flex-wrap wrap
        .hot-item
          height 30px
          line-height 30px
          border-radius 30px
          margin-top 10px
          background #f7f7f7
          text-align center
          color #888
          font-size 14px
          // margin-right 15px
          padding 1px 12px
          margin-right 10px
    .split
      border 1px solid #eee
      transform scale3d(1, 0.5, 1)
</style>
