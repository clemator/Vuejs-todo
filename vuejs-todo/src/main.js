import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueJsModal from 'vue-js-modal'

Vue.use(VueJsModal, {
  dynamic: true
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
