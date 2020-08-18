import Vue from 'vue'
import App from './App.vue'

// router for vue
import VueRouter from 'vue-router'

// form validation library
import Vuelidate from 'vuelidate'

// vuex
import store from './store'

// plugin for smooth scrolling to anchor
import vueSmoothScroll from 'vue-smooth-scroll'
Vue.use(vueSmoothScroll)

// get the routes
import Routes from './Routes'

// turn off the production tip in the console
Vue.config.productionTip = false


Vue.use(Vuelidate)
Vue.use(VueRouter)

// use the library moment and the plugin vue-moment to deal with date format
const moment = require('moment')
require('moment/locale/fr')
 
Vue.use(require('vue-moment'), {
    moment
})


// create the router
const router = new VueRouter({
  routes: Routes,

  // remove the hash from the urls
  mode: 'history'
})

// Global navigation guard  
router.beforeEach((to, from, next) => {
  
  if(to.matched.some(record => record.meta.requiresAuth)){
    console.log('user:'+ store.state.user.employeeId)
    // check if user is connected
    if(!store.state.user){
      //redirect to splash screen
      next({
        name: 'splash'
      });
    // continue with normal flow 
    } else {
      next();
    }
  } else {
    next();
  }
})

// new instance of vue
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


export default router;















