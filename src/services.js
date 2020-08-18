import axios from 'axios'
import router from './main'
import store from './store'

// configuring the base url of all the axios requests
const http = axios.create({
    baseURL: 'http://localhost:4000'
})
  
// Add a global request interceptor
http.interceptors.request.use(
config => {
    if(localStorage.getItem('user')) {
    // send the token in the request header
    const token = JSON.parse(localStorage.getItem('user')).token;
    config.headers['Authorization'] = 'Bearer ' + token;
    }
    
    // config.headers['Content-Type'] = 'application/json';
    return config;
    
},
error => {
    Promise.reject(error)
});

// Add a response interceptor
http.interceptors.response.use( (response) => {
return response
},
function (error) {
    if (error.response.status === 401) {
        // if token expired clear user data and redirect to splash screen
        store.commit('CLEAR_USER_DATA')
        router.push('/')
    }
    // return Error object with Promise
    return Promise.reject(error);
      
});

export default http;
