import Vue from 'vue'

// 按需引入部分组件
import { Button, DatetimePicker, Popup } from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Popup.name, Popup)

import popupTop from './custom-plugin/popup-top'
Vue.use(popupTop)

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
