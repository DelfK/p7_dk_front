// import components 
import Splash from './components/Splash'
import Login from './components/Login'
import Signin from './components/Signin'
import Home from './components/Home'
import Article from './components/Article/Article'
import Profile from './components/Profile/Profile'
import createArticle from './components/Article/createArticle'
import EditProfile from './components/Profile/EditProfile'
import NotFound from './components/NotFound'
import Moderation from './components/Moderation'
import http from './services'

// use the vuex store to get the state of the user
import store from './store'

export default [
    {
        name:'notFound',
        path:'/404',
        component: NotFound,
        meta: {showWelcomeProfile: true, requiresAuth: true}
    },
    {
        name:'splash',
        path: '/',
        component: Splash,
        // hiding the header in the splash screen
        meta: { hideHeader: true}
    },
    {
        name:'moderate',
        path:'/commentaires',
        component: Moderation,
        meta:{showWelcomeProfile: true, requiresAuth: true},
        // check if the user is moderator
        beforeEnter: (to, from, next) => {
            if(store.state.moderator === true){
                next()
            } else {
                // if not redirect to home
                next({name: 'home'})
            }
              
        }
        
    },
    {
        name:'nouvelarticle',
        path: '/nouvelarticle',
        component: createArticle,
        meta: { showWelcomeProfile: true, requiresAuth: true}
    },
    {
        name:'login',
        path: '/login',
        component: Login,
        meta: { showWelcome: true}
    },
    {
        name:'signin',
        path: '/signin',
        component: Signin,
        meta: { showWelcome: true}
    },
    {
        name:'home',
        path: '/home',
        component: Home, 
        meta: {showWelcomeProfile: true, requiresAuth: true}
    },
    {
        name:'article',
        path: '/article/:employee/:id',
        component: Article,
        meta: {showWelcomeProfile: true, requiresAuth: true},
        beforeEnter: (to, from, next) => {
            // check if the story with the id in params exists
            return http
            .get(`/api/employee/stories`)
            .then( response => {
                const exists = response.data.find( element => 
                        element.id === JSON.parse(to.params.id)
                    
                )
                if(exists){
                    next()
                // if not redirect to 404 page
                } else {
                    next({name: 'notFound'})
                }
                        
            })
              
        }
    },
    {
        name:'profile',
        path: '/:employeeName',
        component: Profile, 
        meta: {showWelcomeProfile: true, requiresAuth: true}
    },
    {
        name:'edit',
        path: '/:employeeName/edit',
        component: EditProfile, 
        meta: {showWelcomeProfile: true, requiresAuth: true}
    }
    
]
