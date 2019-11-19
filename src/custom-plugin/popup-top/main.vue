<template>
  <div>
    <mt-popup
      class="mt-popup"
      v-model="visible"
      position="top"
      pop-transition=""
      :modal="modal">
      <p>sssssssssaaa</p>
    </mt-popup>
  </div>
</template>

<script>
export default {
  props: {
    modal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false
    }
  }
}
</script>

<style scoped>
.mint-popup {
  /*width: 100%;*/
  /*height: auto;*/
}
</style>