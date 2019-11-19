import Vue from 'vue'
import popupTop from './main.vue'

const PopupTopConstructor = Vue.extend({
  extends: popupTop,
  data() {
    return {
      visible: true
    }
  }
})

const popupInstance = (options) => {
  // 如果是服务端渲染，不做处理
  if(Vue.prototype.$isServer) {
    return false
  }

  const { ...rest } = options
  const instance = new PopupTopConstructor({
    propsData: {
      ...rest
    }
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
}

export default Vue => {
  Vue.prototype.$popupTop = popupInstance
}
