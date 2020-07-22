import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'


// get the routes
import Routes from './Routes'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuelidate)

// create the router
const router = new VueRouter({
  routes: Routes,
  // remove the hash from the urls
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
