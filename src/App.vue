<template>
  <div id="app">
    <header-top v-if="!$route.meta.hideHeader"></header-top>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'


export default {
  name: 'App',
  components: {
    'header-top': Header,
    
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
  

  #app {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400; 
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  
  }

  h1{
    text-align:center
  }

  #app .container{
    max-width: 1200px;
    padding: 0 15px;
    margin-left: auto;
    margin-right: auto;
  }

  #app .small-container{
    max-width: 800px;
    padding: 20px 15px;
    margin-left: auto;
    margin-right: auto;
  }

  #app img.responsive-image {
    max-width: 100%;
    height: auto;
  }


/*BUTTONS*/
 .btn{
      padding: 12px 12px 12px 12px;
      display: inline-block;
      border-radius: 6px;
      font-weight: 500;
 }

 .btn-primary{
    border: 1px solid #fff;
    color: #f7f7f7;
    background-color: #92BFBA;
 }

 .btn-primary:hover{
   background-color:#FFD8D8;
   border: 1px solid #fff;
   color: #fff;
   cursor:pointer;
 }

 .btn-secondary{
   border: 1px solid #92BFBA;
    color: #92BFBA;
    background-color: #fff;
 }

 .btn-secondary:hover{
    border: 1px solid #fff;
    color: #f7f7f7;
    background-color: #FFD8D8;
 }

 button{
   font-family: 'Montserrat', sans-serif;
   font-size: 1rem; 
 }

 button:focus{
    border: 1px solid #999;
    outline: none;
}

/*FORMS*/

label{
    font-size: 1rem;
    color: #999
    
}

.error{
    font-size: 0.85rem;
    line-height: 1;
    display: none;
    margin-left: 14px;
    margin-top: -0.75rem;
    margin-bottom: 0.9375rem;
}

.errorMsg{
   color: #f57f6c
}

.form-group--error + .error{
    display:block;
    color: #f57f6c
}

.form-group--error label, .form-group--error input{
    color: #f57f6c
}

form .form-group--error input:focus{
    border-color: #f57f6c
}

form {
    padding: 0 100px;
}

form input{
    border: 1px solid #ddd;
    border-radius: 0.4rem;
    height: 46px;
    padding: 0 6px;
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    color: #777;
    margin: 10px 0 20px 0;
}

form input:hover{
    border-color: #999
}

form input:focus{
    outline: none;
    border: 1px solid #999;
}

 

 
</style>
