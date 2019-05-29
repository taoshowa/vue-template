import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import './permission' // permission control 为方便页面编写，暂不判断登录状态
import './routerHook' // routerHook

import '@/styles/index.less' // global css

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
