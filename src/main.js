import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import store from './store'

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
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Navigation guards / redirect to splash screen 
router.beforeEach((to, from, next) => {
  if(to.matched.some( record => record.meta.requiresAuth)){
    console.log('user :' + store.state.user)
    if(!store.state.user){
      next({
        name: 'splash'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})












