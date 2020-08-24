<template>
    <div class="splash">
        <div class="small-container">
                <div class="welcome">
                    <img class="logo responsive-image" src="../assets/icon-left-font-monochrome-white.png" alt="groupomania">
                    <!-- Message for users whom account is deactivated -->
                    <div v-if="this.$store.state.deletedAccountMsg" class="deletedMessage">
                    Votre compte a bien été désactivé.
                    </div>
            
                    <welcome role="naviguation"></welcome>            
                </div>
        </div>

    </div>
</template>

<script>

    import Welcome from './Header/Welcome'

    export default {

        name: 'Splash',
        components: {
            'welcome': Welcome
        },

        beforeDestroy(){
            this.$store.deletedAccountMsg = false
        }
    }

</script>

<style scoped>
.deletedMessage{
    color: #487B91;
    background-color: #FFF;
    padding: 20px;
    border-radius: 2px;
    text-align: center;
    font-size: 1.25rem;
    margin: 0 0 30px 0 
}

.splash{
    width: 100%;
    height: 100vh;
    background: url("../assets/splash_min.jpg");
    background-size:cover;
}

.splash .small-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%
}

.welcome{
    width: 80%;
    min-width: 260px
}

.welcome_btn{
    padding: 25px 0;
    display: flex;
    justify-content: space-around;
}

</style>