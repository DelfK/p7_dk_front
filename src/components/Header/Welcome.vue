<template>
    
    <div class="welcome_btn">
        <router-link to='/signin'>
        <div class="btn btn-primary">S'inscrire</div> 
        </router-link>
        <router-link to="/login"><div class="btn btn-secondary">Se connecter</div></router-link>       
    </div>             


</template>

<script>
export default {
    name: 'Welcome'
}
</script>

<style scoped>

.welcome_btn{
    padding: 25px 0;
    display: flex;
    justify-content: space-around;
    
}

</style>