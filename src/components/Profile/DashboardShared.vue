<template>

        <div class="toggleContent">
            <ul>
                <div class="noArticles" v-if="noArticles">
                    <p>Personne n'a partagé d'article avec vous</p>
                    <div class="btn btn-secondary" v-on:click="$router.push('/home')">Découvrir</div>

                </div>
                <li v-bind:key="index" v-for="(share, index) in shares">
                    <div class="detailsArticle">
                        <div class="articleImg">
                            <img class="responsive-image" v-bind:src="share.imageUrl" alt="">
                            
                        </div>
                        <div>
                            <div class="auteur"><span>{{share.first_name}} {{share.name}}</span>
                            
                            </div>
                            <p  class="title">{{share.title}}</p>
                            
                        </div>
                        <div>
                            <div class="lire btn btn-primary" v-on:click="$router.push(share.url)">Lire l'article</div>
                        </div>   
                    </div>
                    
                </li>
            </ul>
                
        </div>
</template>

<script>
    import http from '../../services'
    export default {
        name:'SharedArticles',

        data() {
            return {
                shares: [],
                noArticles: true
            }
        },

        created(){
            // display articles shared with the user
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .get(`/api/employee/${id}/shares`)
            .then( response => {
                for(const share of response.data.shares){
                    if(!share.imageUrl){
                        // display a default image when no image has been provided
                        share.imageUrl = 'http://localhost:4000/images/story.jpg'
                    }

                    // get the path to the article (link of the button "Lire")
                    share.url = `/article/${share.employee_id}/${share.id}`

                    this.shares.push(share)

                    // hide message displayed when there are no articles shared
                    this.noArticles = false
                    
                }

                    
            })
            
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
    margin: 20px 0;
    
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