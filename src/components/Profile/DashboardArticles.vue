<template>

        <div class="toggleContent">
        
            <ul>
                <div class="noArticles" v-if="noArticles">
                    <p>Vous n'avez pas d'articles pour le moment</p>
                    <div class="btn btn-secondary">Rédiger</div>
                </div>
                <div class="validateMsg" v-if ="articleDeleted">Votre article a bien été supprimé<span class="fermer" v-on:click="toggleValidMessage">x</span></div>
                <li v-bind:key="index" v-for="(article, index) in articles">
                
                    <div class="detailsArticle">
                        <div class="articleImg">
                            <img class="responsive-image" v-bind:src="article.imageUrl" alt="">
                            
                        </div>
                        <div>
                            
                            <p  class="title">{{article.title}}</p>
                            
                        </div>
                        <div>
                            <div class="lire btn btn-edit red" v-on:click="deleteArticle(article.id, index)">Supprimer</div>
                        </div>   
                    </div>
                    
                </li>
            </ul>
                
        </div>
</template>

<script>
    import http from '../../services'
    export default {
        name:'BoardArticles',
        data() {
            return {
                articles: [],
                articleDeleted: false,
                noArticles: true,
                
                
            }
        },

        created(){
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .get(`/api/employee/${id}/stories`)
            .then( response => {
                console.log(response.data)
                for(const article of response.data){
                    if(!article.imageUrl){
                        article.imageUrl = 'http://localhost:4000/images/story.jpg'
                    }
                    article.url = `/article/${article.employee_id}/${article.id}`
                    this.articles.push(article)
                    this.noArticles = false
                    
                }

                    
            })
            
            
        },

        methods: {
            deleteArticle(artId, index){
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .delete(`/api/employee/${id}/stories/${artId}`)
            .then( () => {
                
                this.articleDeleted = true
                this.articles.splice(index, 1)
            })
            },
            toggleValidMessage(){
                this.articleDeleted = false
            }, 

           
        }

    }
</script>

<style scoped>

ul{
    list-style-type: none;
    margin: 0
}
.detailsArticle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0
    
}
.detailsArticle div:nth-child(2){
    flex: 0 0 50%;
    padding: 5px 15px

}

.detailsArticle div:nth-child(3){
    flex: 0 0 25%;
    


}

.detailsArticle div:first-child{
    flex: 0 0 25%
}

.title{
    font-size: 1.2rem;
    font-weight: 500
}

.noArticles{
    text-align: center
}

</style>