import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import '@/plugins'
import '@/plugins/vee-validate';
import "@/helpers/filters";
import Vue from 'vue'
import App from './App.vue'
import './plugins/acl'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
