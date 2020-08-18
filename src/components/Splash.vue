<template>
    <div class="splash">
        <div class="small-container">
                <div class="welcome">
                    <img class="logo responsive-image" src="../assets/icon-left-font-monochrome-white.png" alt="groupomania">
                    <welcome></welcome>            
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
        }
    }

</script>

<style scoped>

.splash{
    width: 100%;
    height: 100vh;
    background: url("../assets/splash-min.jpg");
    background-size:cover;
}

.splash .small-container{
    display: flex;
    justify-content: center;
    align-items:center;
    height:100%
}

.welcome{
    width: 600px;
}

.welcome_btn{
    padding: 25px 0;
    display: flex;
    justify-content: space-around;
}

</style>