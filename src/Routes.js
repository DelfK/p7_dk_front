import Splash from './components/Splash'
import Login from './components/Login'
import Signin from './components/Signin'



export default [
    {name:'splash', path: '/', component: Splash, meta: { hideHeader: true}},
    {name:'login', path: '/login', component: Login, meta: { showWelcome: true}},
    {name:'signin', path: '/signin', component: Signin, meta: { showWelcome: true}},
    {name:'home', path: '/home', meta: {showWelcomeProfile: true, requiresAuth: true} }
    
]
