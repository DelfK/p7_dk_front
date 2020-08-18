<template>
    
    <div class="welcome_btn">
        <router-link to='/signin'>
        <button class="btn btn-primary">S'inscrire</button> 
        </router-link>
        <router-link to="/login"><button class="btn btn-secondary">Se connecter</button></router-link>       
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