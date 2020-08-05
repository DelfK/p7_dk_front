import Splash from './components/Splash'
import Login from './components/Login'
import Signin from './components/Signin'
import Home from './components/Home'
import Article from './components/Article'
import Profile from './components/Profile/Profile'
import createArticle from './components/createArticle'
import EditProfile from './components/Profile/EditProfile'



export default [
    {name:'splash', path: '/', component: Splash, meta: { hideHeader: true}},
    {name:'nouvelarticle', path: '/nouvelarticle', component: createArticle, meta: { showWelcomeProfile: true, requiresAuth: true}},
    {name:'login', path: '/login', component: Login, meta: { showWelcome: true}},
    {name:'signin', path: '/signin', component: Signin, meta: { showWelcome: true}},
    {name:'home', path: '/home', component: Home,  meta: {showWelcomeProfile: true, requiresAuth: true} },
    {name:'article', path: '/article/:employee/:id', component: Article,  meta: {showWelcomeProfile: true, requiresAuth: true} },
    {name:'profile', path: '/:employeeName', component: Profile,  meta: {showWelcomeProfile: true, requiresAuth: true} },
    {name:'edit', path: '/:employeeName/edit', component: EditProfile,  meta: {showWelcomeProfile: true, requiresAuth: true} }
   
    
]
