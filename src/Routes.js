import Splash from './components/Splash'
import Login from './components/Login'
import Signin from './components/Signin'
import Home from './components/Home'
import Article from './components/Article'
import Profile from './components/Profile/Profile'
import createArticle from './components/createArticle'
import EditProfile from './components/Profile/EditProfile'
import NotFound from './components/NotFound'
import Moderation from './components/Moderation'
import http from './services'
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
        meta: { hideHeader: true}
    },
    {
        name:'moderate',
        path:'/commentaires',
        component: Moderation,
        meta:{showWelcomeProfile: true, requiresAuth: true},
        beforeEnter: (to, from, next) => {
            if(store.state.moderator === true){
                next()
            } else {
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
            // check if params id is id of existing story
            return http
            .get(`/api/employee/stories`)
            .then( response => {
                console.log(response.data)
                const exists = response.data.find( element => 
                        element.id === JSON.parse(to.params.id)
                    
                )
                if(exists){
                    next()
                // redirect to 404 page
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
