<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <keep-alive :exclude="['TaskList', 'TaskDetail']">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide'
    }
  },
  watch: {
    '$route'(to, from) {
      const toName = to.name
      const fromName = from.name
      if(fromName === 'search') {
        this.transitionName = 'slide-right'
      } else if(toName === 'search') {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = ''
      }
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
.slide-left-enter-active, .slide-right-leave-active, .slide-right-enter-active
  transition all .15s
.slide-left-enter
  opacity 0
  transform translate3d(100%, 0, 0)
.slide-right-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
.slide-right-enter
  opacity 0
  transform translate3d(-100%, 0, 0)
</style>
