import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueJsModal from 'vue-js-modal'
import VueDraggable from 'vue-draggable'

Vue.use(VueJsModal, {
  dynamic: true
})

Vue.use(VueDraggable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
