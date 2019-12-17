import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online !!!
 */
import { mockXHR } from '../mock'
if(process.env.NODE_ENV === 'production') {
  mockXHR()
}

/* eslint-disable */
// 按需引入部分组件
import { Button, DatetimePicker, Popup, Loadmore } from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Popup.name, Popup)
Vue.component(Loadmore.name, Loadmore)

/* eslint-disable */
import popupTop from './custom-plugin/popup-top'
Vue.use(popupTop)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
