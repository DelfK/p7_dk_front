<template>

    <header role="banner" class="header">

        <router-link to="/home"><img src="../../assets/icon.png" alt="groupomania"></router-link>
        <div v-if="$route.meta.showWelcomeProfile" class="createArticle">
            <button role="link" v-on:click="$router.push('/nouvelarticle')" class="btn btn-edit">Rédiger</button>
        </div>

        <div class="header_navigation">
            <!-- Public menu -->
            <welcome v-if="$route.meta.showWelcome"></welcome>
            <!-- Connected menu -->
            <dropdown v-if="showMenu"></dropdown>
            <welcomeprofile v-if="$route.meta.showWelcomeProfile"></welcomeprofile>
            
        </div>

    </header>
     
</template>
<script>
import Welcome from './Welcome'
import WelcomeProfile from './WelcomeProfile'
import DropDownMenu from './DropDownMenu'

export default{

    name: "Header",


    components:{
        'welcome':Welcome,
        'welcomeprofile': WelcomeProfile,
        'dropdown': DropDownMenu
    },

    computed: {
      showMenu() {
        return this.$store.state.showMenu
      }
    }  
}
</script>
<style>
.header{
    position:fixed;
    top: 0;
    left: 0;
    right:0;
    height: 65px;
    padding: 10px 15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    box-shadow: 2px 1px 3px 1px rgba(0, 0, 0, 0.2);
    z-index:2
    
    
}

.header img{
    width: 45px;
    display: block
}

.createArticle {
    flex: 2;
    text-align: right;
    padding: 0 20px 0 0;
}

.createArticle .btn{
    background: url('../../assets/edit.svg') no-repeat 10px center;
    background-size: 18px;
    padding: 7px 10px 7px 34px;
}

.createArticle .btn:focus{
    outline: auto;
    
}

.createArticle .btn:hover{
    opacity: 0.8;
    color: #909090
    
}

@media (max-width: 768px){
  .createArticle{
      display: none
  }

  
}

</style>