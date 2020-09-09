<template>
    <div class="container">
        <div class="small-container" role="main">
            <h2>Articles de la communauté</h2>
            
            <ul role="contentinfo">
                <li v-bind:key="index" v-for="(article, index) in allArticles">
                    <div class="articleResult">
                        <router-link role="link" v-bind:to="`/article/${article.employee_id}/${article.id}`">
                            <div class="vignette">
                                <img role="link" v-bind:src="article.imageUrl" alt="vers le contenu de l'article">
                            </div>
                        </router-link>
                        <div class="details">
                            
                            <div>
                                <router-link  role="link" v-bind:to="`/article/${article.employee_id}/${article.id}`"><h3>{{article.title}}</h3></router-link>
                                <p>{{article.content.slice(0, 130)}}...</p>
                            </div>
                            <div class="auteur">
                                <div>
                                    <span>{{article.first_name}} {{article.name}}</span>  - {{ article.dateCreated | moment("dddd Do MMMM YYYY") }}
                                </div>
                                <div class="partage">
                                    <div class="comment"></div>
                                    <div class="share">
                                        <router-link role="link" v-bind:to="`/article/${article.employee_id}/${article.id}`"><img class="responsive-image" src="../assets/connection.svg" alt="vers le contenu de l'article"></router-link>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>   
                </li>       
            </ul>
            <div class="center">
                <paginate v-on:changePage="displayArticles($event)"></paginate>
            </div>
            
        </div>
    </div>
    
</template>

<script>

    import http from '../services'
    import Pagination from './Pagination'
    export default {
        name: 'Home',
        components: {
        'paginate': Pagination
      
        },
        data() {
            return {
                allArticles: [],
                employees:[],
                limit: 5,
                offset: 0,
                
            }
        },

        // display all the employees' articles on homepage
        created(){
            return http
            .get(`/api/employee/stories?limit=${this.limit}&offset=${this.offset}`)
            .then(response => {
                for(const article of response.data){
                    this.allArticles.push(article)
                }  
            })
        },

        methods:{
            displayArticles: function(offset){
                this.allArticles = []
                this.offset = offset
                return http
                .get(`/api/employee/stories?limit=${this.limit}&offset=${this.offset}`)
                .then(response => {
                    for(const article of response.data){
                        this.allArticles.push(article)
                    }  
                })
                }
        }
        
    }

</script>

<style scoped>
.center{
    width: 100%;
    display: flex;
    justify-content: center
}

h2{
    margin: 30px 0 30px 0
}

h3{
    margin:0
}

.articleResult{
    display: flex;
    margin: 40px 0
    
}

.vignette{
    flex: 0 0 30%;
    height: 140px;
    overflow:hidden;
    
    
}

.vignette img{
    width: 100%;
    height: auto;
    
}

.details{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 0 0 18px;
    flex: 0 0 70%;
    color: #444;
    
}

.details p{
    font-size: 0.95rem;
}

.auteur {
    display: flex;
    justify-content: space-between;
    color: #909090;
}

.auteur div:first-child{
    flex: 0 0 92.6%;
}

.auteur div:nth-child(2){
    flex: 0 0 6.4%;
}

.auteur span{
    font-weight: 600;
    color: #67a69f
   
}

.share{
    border-radius: 50%;
    background-color: #eee;
    padding: 6px;
}

.share:hover{
    background-color: #e6e6e6
}

.share img{
    display: block
}

ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
}

@media (max-width: 768px){

    .articleResult{
    flex-direction: column;
    margin: 40px 0  
    }
    .details{
        margin: 18px 0
    }

    .auteur div:first-child{
        flex: 0 0 91%;
    }

    .auteur div:nth-child(2){
        flex: 0 0 9%;
    }

    .share{
        padding: 9px
    }
}


</style>