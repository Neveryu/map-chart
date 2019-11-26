<template>
  <div>
    <div class="header-wrapper">
      <div class="back" @click="goBack()" v-show="showBack"></div>
      <div class="back" @click="goApp()" v-show="showBackApp"></div>
      <span class="title">{{title}}</span>
      <div class="search" @click="goSearch()" v-show="showSearch"></div>
    </div>
    <div class="fix-clear" style="height: 48px"></div>
  </div>
</template>
<script>
export default {
  name: 'm-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: false
    },
    showBackApp: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goApp() {
      try {
        window.WebViewJavasriptBridge.callHandler('webAppExit')
      } catch (e) {
        console.log('调用app接口，返回到app')
      }
    },
    goSearch() {
      this.$router.push('/search')
    }
  }
}
</script>
<style scoped lang="stylus">
.header-wrapper
  position fixed
  width 100%
  height 48px
  top 0
  background #1895FF
  text-align center
  z-index 99999999
  // padding 0 4%
  .back
    display inline-block
    float left
    width 25px
    height 48px
    padding-left 5%
    background-image url('~@/assets/images/icon-back.png')
    background-repeat no-repeat
    background-position center
    background-size 25%
  .title
    position absolute
    top 0
    left 20%
    display inline-block
    width 60%
    height 48px
    line-height 48px
    color #fff
    font-size 18px
    text-align center
  .search
    display inline-block
    float right
    width 36px
    height 48px
    padding-right 5%
    background-image url('~@/assets/images/icon-search.png')
    background-repeat no-repeat
    background-position center
    background-size 33%
</style>
