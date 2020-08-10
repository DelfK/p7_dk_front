import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import store from './store'
import vueSmoothScroll from 'vue-smooth-scroll'

Vue.use(vueSmoothScroll)

// get the routes
import Routes from './Routes'

Vue.config.productionTip = false


Vue.use(Vuelidate)
Vue.use(VueRouter)


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

// Navigation guards / redirect to splash screen 
router.beforeEach((to, from, next) => {
  
  if(to.matched.some( record => record.meta.requiresAuth)){
    if(!store.state.user){
      next({
        name: 'splash'
      });
      
    } else {
      next();
    }
  } else {
    next();
  }
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default router;















