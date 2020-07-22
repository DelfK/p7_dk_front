<template>
 <div class="header">
     <router-link to="/"><img src="../assets/icon.png" alt="groupomania"></router-link>
     <div class="header_navigation"><welcome v-if="$route.meta.showWelcome"></welcome></div>
 </div>
   
</template>
<script>
import Welcome from './Welcome'
export default{
    name: "Header",
    components:{
        'welcome':Welcome
    }
    
}
</script>
<style>
.header{
    position:fixed;
    top: 0;
    left: 0;
    right:0;
    height: 80px;
    padding: 15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    box-shadow: 2px 1px 3px 1px rgba(0, 0, 0, 0.2);
    
}

.header img{
    width: 60px;
}

.header_navigation{
    width: 300px;
}

</style>