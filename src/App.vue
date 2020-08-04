<template>
  <div id="app">
    <header-top v-if="!$route.meta.hideHeader"></header-top>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header/Header'


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
    padding: 120px 0;
    margin-left: auto;
    margin-right: auto;
  }

  #app .small-container{
    max-width: 800px;
    padding: 0 15px;
    margin-left: auto;
    margin-right: auto;
  }

  #app img.responsive-image {
    max-width: 100%;
    height: auto;
  }

  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    
  }
  .avatarBig{
    width: 160px;
    height:160px;
    border-radius: 50%;
    overflow: hidden;
  }

  .auteur{
    color: #aaa;
    font-size: 0.90rem;
  }



  


/*BUTTONS*/
 .btn{
      padding: 11px;
      display: inline-block;
      border-radius: 5px;
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
    cursor: pointer
 }

 .btn-edit{
    border: 1px solid #909090;
    color: #909090;
    background-color: #fff;
    font-size: 0.75rem;
    border-radius: 3px;
    padding: 6px;
 }

 .btn-edit:hover{
    border: 1px solid #bbb;
    color: #bbb;
    background-color: #fff;
    cursor: pointer
 }

 .red{
   border: 1px solid #ff5050;
    color: #ff5050;
    background-color: #fff;

 }

 .red:hover{
   border: 1px solid #ff5050;
    color: #fff;
    background-color: #ff5050;

 }

 .share{
    cursor: pointer
}

 button{
   font-family: 'Montserrat', sans-serif;
   font-size: 1rem; 
 }

 button:focus{
    border: 1px solid #999;
    outline: none;
}

a{
  text-decoration: none;
  color: inherit
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

.validateMsg{
   color: #00e179;
   border: 1px solid #00e179;
   border-radius: 2px;
   position: relative;
   padding: 10px 22px 10px 10px;
   display: inline-block;
}

.fermer{
  position: absolute;
  top: 0;
  right: 7px;
  display: inline-block;
  font-weight: 400

}

.fermer:hover{
  cursor: pointer
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

/*HEADINGS*/
.subtitle{
    color: #92BFBA;
    font-size: 1.2rem
}

.toggleContent{
  padding: 20px 0;
}

 

 
</style>
