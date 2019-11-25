<template>
  <div class="main-wrapper">
    <table class="table">
      <thead class="thead">
        <tr>
          <td class="catelog">类别</td>
          <td class="detail-catelog">细分类别</td>
          <td class="value">数量(件)</td>
        </tr>
      </thead>
      <tbody class="tbody">
        <template v-for="(item, index) of tableData" v-if="index < defaultShowNum">
          <tr :key="index" align="center" v-if="item.children">
            <td :rowspan="item.children.length" style="vertical-align: middle;">{{item.name}}</td>
            <td>{{item.children[0].name}}</td>
            <td class="value">{{item.children[0].number}}</td>
          </tr>
          <tr :key="index" align="center" v-else>
            <td>{{item.name}}</td>
            <td>-</td>
            <td class="value">{{item.number}}</td>
          </tr>
          <tr v-for="(item1, index1) of item.children" :key="item1.id" v-if="item.children && index1 > 0" align="center">
            <td>{{item1.name}}</td>
            <td class="value">{{item1.number}}</td>
          </tr>
        </template>
        <template v-for="(item, index) of tableData" v-if="index >= defaultShowNum">
          <tr :key="index" align="center" v-if="item.children" v-show="showMore">
            <td :rowspan="item.children.length" v-if="item.children" style="vertical-align: middle;">{{item.name}}</td>
            <td>{{item.children[0].name}}</td>
            <td class="value">{{item.children[0].number}}</td>
          </tr>
          <tr :key="index" align="center" v-else v-show="showMore">
            <td>{{item.name}}</td>
            <td>-</td>
            <td class="value">{{item.number}}</td>
          </tr>
          <tr v-for="(item1, index1) of item.children" :key="item1.id" v-if="item.children && index1 > 0" v-show="showMore" align="center">
            <td>{{item1.name}}</td>
            <td class="value">{{item1.number}}</td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="more" v-show="!showMore" @click="show">
      <p>查看全部</p>
    </div>
  </div>
</template>
<script>
import { debounce } from '@/util/debounce'
// let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default {
  name: 'detail-catelog',
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      defaultShowNum: 5,
      showMore: false
    }
  },
  methods: {
    show() {
      this.showMore = true
    }
  },
  mounted() {
    this.$el.style.width = this.width
    this.$el.style.height = this.height
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
<style scoped lang="stylus">
  .main-wrapper
    box-sizing border-box
    padding 10px
    .table
      width 100%
      color #666
      .thead
        background #1895FF
        color #fff
        text-align center
        tr
          height 30px
          line-height 30px
          font-size 14px
      .tbody
        tr
          height 30px
          line-height 30px
          &:nth-child(even)
            background #F7F7F7
          .value
            color #1895FF
    .more
      margin-top 5px
      height 30px
      line-height 30px
      color #9B9B9B
      border-top 1px solid #eee
      font-size 12px
      text-align center
</style>
