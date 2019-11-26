import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// 按需引入部分组件
import { Button, DatetimePicker, Popup } from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Popup.name, Popup)

/* eslint-disable */
import popupTop from './custom-plugin/popup-top'
Vue.use(popupTop)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
