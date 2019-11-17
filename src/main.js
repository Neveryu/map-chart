import Vue from 'vue'

// 按需引入部分组件
import { Button, DatetimePicker } from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(DatetimePicker.name, DatetimePicker)

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
