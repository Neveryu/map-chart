<template>
  <div class="main-wrapper">
    <table class="table">
      <thead class="thead">
        <tr>
          <td>排名</td>
          <td class="depart">部门</td>
          <td class="rate">占比</td>
          <td class="total">总量</td>
        </tr>
      </thead>
      <tbody class="tbody" v-if="tableData.length > 0">
        <!-- eslint-disable -->
        <tr v-for="(item, index) of tableData" :key="item.id" v-if="index < defaultShowNum" align="center">
          <td class="num">
            <span :class="(index + 1) === 1 ? 'sort1' : (index + 1) === 2 ? 'sort2' : (index + 1) === 3 ? 'sort3' : ''">{{(index + 1)}}</span>
          </td>
          <td>{{item.departName}}</td>
          <td>{{item.rate}}</td>
          <td>{{item.number}}场</td>
        </tr>
        <!-- <tr v-for="(item, index) of tableData" :key="item.id" v-if="index < defaultShowNum" align="center">
          <td class="num">
            <span :class="(index + 1) === 1 ? 'sort1' : (index + 1) === 2 ? 'sort2' : (index + 1) === 3 ? 'sort3' : ''">{{(index + 1)}}</span>
          </td>
          <td>{{item.departName}}</td>
          <td>{{item.rate}}</td>
          <td>{{item.number}}件</td>
        </tr>
        <tr v-for="(item, index) of tableData" :key="index" v-if="index >= defaultShowNum" v-show="showMore" align="center">
          <td class="num">
            <span :class="(index + 1) === 1 ? 'sort1' : (index + 1) === 2 ? 'sort2' : (index + 1) === 3 ? 'sort3' : ''">{{(index + 1)}}</span>
          </td>
          <td>{{item.departName}}</td>
          <td>{{item.rate}}</td>
          <td>{{item.number}}件</td>
        </tr> -->
      </tbody>
      <tbody class="tbody" v-if="tableData.length === 0">
        <tr>
          <td colspan="3" style="text-align: center;">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div class="more" v-show="tableData.length > defaultShowNum" @click="show">
      <p>查看全部</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail-catelog',
  props: {
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
      defaultShowNum: 5
    }
  },
  methods: {
    show() {
      this.defaultShowNum = 99
    }
  }
}
</script>
<style scoped lang="stylus">
.main-wrapper
  box-sizing border-box
  min-height 50px
  padding 6px
  .table
    width 100%
    color #666
    .thead
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
        td.num
          span
            display inline-block
            width 16px
            height 16px
            line-height 16px
            border-radius 50%
            background #3ea6c3
            color #fff
            &.sort1
              background #c03e5e
            &.sort2
              background #e79339
            &.sort3
              background #eed147
  .more
    margin-top 5px
    height 30px
    line-height 30px
    color #9B9B9B
    border-top 1px solid #eee
    font-size 12px
    text-align center
</style>
