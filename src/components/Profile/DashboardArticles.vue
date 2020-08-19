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
                            <router-link :to="article.url"><p  class="title">{{article.title}}</p></router-link>
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
            //display the articles created by the user
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .get(`/api/employee/${id}/stories`)
            .then( response => {
                for(const article of response.data){
                    if(!article.imageUrl){
                        // display a default image when no image provide by the user
                        article.imageUrl = 'http://localhost:4000/images/story.jpg'
                    }

                    // get the path to the article
                    article.url = `/article/${article.employee_id}/${article.id}`

                    // put the article in the articles array
                    this.articles.push(article)

                    // hide the message displayed when there are no articles
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
                    // display the confirmation message
                    this.articleDeleted = true
                    // remove the deleted article from the array so it disappears from the page
                    this.articles.splice(index, 1)
                })
            },

            toggleValidMessage(){
                // hide the confirmation message
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

@media (max-width: 768px){
     ul{
         padding: 0
     }

    .articleImg{
        display: none
    }
}

</style>