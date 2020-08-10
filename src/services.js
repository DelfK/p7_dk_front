import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:4000'
  })
  
  // Add a request interceptor
  http.interceptors.request.use(
  config => {
     if(localStorage.getItem('user')) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        config.headers['Authorization'] = 'Bearer ' + token;
        console.log('coucou token')
     }
     
      // config.headers['Content-Type'] = 'application/json';
      return config;
      
  },
  error => {
      Promise.reject(error)
  });
  
  export default http;
