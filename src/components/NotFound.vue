<template>
    <div class="container">
        <div class="small-container notfound">
            <img src="../assets/error.svg" alt="">
        </div>
        
    </div>
</template>

<script>
    export default {
        name:'notFound'
        
    }
</script>

<style scoped>
.notfound{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 240px)
}

.notfound img{
    width: 50%
}
</style>