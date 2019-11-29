<template>
  <div class="bottom-wrapper">
    <div class="menu menu1" :class="{active: currentMenu === 1}" @click="switchRoute('overview')">
      <span class="name">概况</span>
    </div>
    <div class="menu menu2" :class="{active: currentMenu === 2}" @click="switchRoute('map')">
      <span class="name">形势图</span>
    </div>
    <div class="menu menu3" :class="{active: currentMenu === 3}" @click="switchRoute('tongji')">
      <span class="name">统计对比</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentMenu: {
      type: Number,
      required: true
    }
  },
  methods: {
    switchRoute(name) {
      let currentRouter = this.$route.name
      if(name === currentRouter) {
        return false
      }
      this.$router.push(name)
    }
  }
}
</script>
<style scoped lang="stylus">
.bottom-wrapper
  position fixed
  display flex
  bottom 0
  width 100%
  height 48px
  box-shadow: 0px -2px 10px 1px rgba(211,229,244,1)
  z-index 9999999
  background-color #fff
  padding-bottom 12px
  .menu
    display inline-block
    flex 1
    height 48px
    background-repeat no-repeat
    background-position center top 6px
    background-size 20px auto
    vertical-align top
    text-align center
    .name
      display inline-block
      color #888
      font-size 12px
      margin-top 30px
    &.active
      .name
        color #1b98ff
  .menu1
    background-image url('~@/assets/images/icon-overview.png')
    &.active
      background-image url('~@/assets/images/icon-overview-a.png')
  .menu2
    background-image url('~@/assets/images/icon-map.png')
    &.active
      background-image url('~@/assets/images/icon-map-a.png')
  .menu3
    background-image url('~@/assets/images/icon-tongji.png')
    &.active
      background-image url('~@/assets/images/icon-tongji-a.png')
</style>
