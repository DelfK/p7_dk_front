<template>
    
        <div class="small-container">
            <div class="nav">
                <div v-bind:class="{active: showArticles, hover: showShares }" class="nav_item" v-on:click="toggleArticles">Mes articles</div>
                <div v-bind:class="{active: showShares, hover: showArticles }" class="nav_item" v-on:click="toggleShares">Partagés avec moi</div>
            </div>
            <div class="toggledContent">
                <articles v-if="showArticles"></articles>
                <articlesShared v-if="showShares"></articlesShared>
                
            </div>
        </div>

    
</template>

<script>
    import DashboardArticles from './DashboardArticles'
    import DashboardShared from './DashboardShared'
    export default {
        name: 'Dashboard',
        data() {
            return {
                showArticles: true,
                showShares: false
            }
        },
        components:{
            'articles': DashboardArticles,
            'articlesShared' : DashboardShared
        },
        methods: {
            toggleArticles: function(){
                this.showArticles = true
                this.showShares = false
            },

            toggleShares: function(){
                this.showArticles = false
                this.showShares = true
            }
        }
    }
</script>

<style  scoped>
.toggledContent{
    border-top: 1px solid #c7dedc
}
.nav{
    margin: 20px 0;
    display: flex;
    padding: 5px 
}

.nav_item{
    flex: 0 0 50%;
    text-align: center;
    padding: 15px 30px;
    font-size: 1.1rem;
    color: #c3c3c3;
    
    
}

.hover{
cursor:pointer
}

.nav .nav_item:first-child{
    border-right: 1px solid #eee;
}

.hover:hover{
    color: #b2b2b2;
    background-color: #f6f6f6
}

.active{
    font-weight: 600;
    color: #92BFBA;
    
     
}



</style>