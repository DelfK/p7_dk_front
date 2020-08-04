<template>
    <div class="container">
        <div class="small-container">
        <h2>Articles de la communauté</h2>
        <ul>
            <li v-bind:key="index" v-for="(article, index) in allArticles">
                <div class="articleResult">
                    <router-link v-bind:to="`/article/${article.employee_id}/${article.id}`">
                        <div class="vignette">
                            <img v-bind:src="article.imageUrl" alt="">
                        </div>
                    </router-link>
                    <div class="details">
                        
                        <div>
                            <router-link v-bind:to="`/article/${article.employee_id}/${article.id}`"><h3>{{article.title}}</h3></router-link>
                            <p>{{article.content.slice(0, 130)}}...</p>
                        </div>
                        <div class="auteur">
                            <div>
                                <span>{{article.first_name}} {{article.name}}</span>  - {{ article.dateCreated | moment("dddd Do MMMM YYYY") }}
                            </div>
                            <div class="partage">
                                <div class="comment"></div>
                                <div class="share">
                                    <router-link v-bind:to="`/article/${article.employee_id}/${article.id}`"><img class="responsive-image" src="../assets/connection.svg" alt="lien partage"></router-link>
                                </div>
                            </div>
                        </div>
                        
                        

                    </div>
                </div>
                
            </li>
                
        </ul>

    </div>

    </div>
    
</template>

<script>
    import http from '../services'
    

    export default {
        name: 'Home',
        data() {
            return {
                allArticles: [],
                employees:[]
            }
        },
        created(){
            return http
            .get('/api/employee/stories')
            .then(response => {
                console.log(response.data)
                for(const article of response.data){
                    this.allArticles.push(article)
                }
                
            })
        }
        
    }
</script>

<style scoped>

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
    color: #aaa;
}

.auteur div:first-child{
    flex: 0 0 93%;
}

.auteur div:nth-child(2){
    flex: 0 0 7%;
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


</style>