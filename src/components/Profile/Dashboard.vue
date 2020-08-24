<template>
    
        <div class="small-container">
            <div class="nav" role="navigation">
                <div aria-haspopup="true" v-bind:class="{active: showArticles, hover: showShares }" class="nav_item" v-on:click="toggleArticles">Mes articles</div>
                <div aria-haspopup="true" v-bind:class="{active: showShares, hover: showArticles }" class="nav_item" v-on:click="toggleShares">Partagés avec moi</div>
            </div>
            <div class="toggledContent" role="contentinfo">
                <articles v-if="showArticles" v-bind:aria-expanded="articlesExpanded"></articles>
                <articlesShared v-if="showShares" v-bind:aria-expanded="sharesExpanded"></articlesShared>
                
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
                showShares: false,
                articlesExpanded: null,
                sharesExpanded: null
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
                this.articlesExpanded = true
                this.sharesExpanded = false
            },

            toggleShares: function(){
                this.showArticles = false
                this.showShares = true
                this.articlesExpanded = false
                this.sharesExpanded = true
            }
        }
    }

</script>

<style  scoped>

.toggledContent{
    border-top: 1px solid #c7dedc
}
.nav{
   display: flex;
     
}

.nav_item{
    flex: 0 0 50%;
    text-align: center;
    padding: 35px 0;
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