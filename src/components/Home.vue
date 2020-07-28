<template>
    <div class="container">
        <div class="small-container">
        <h2>Articles de la communauté</h2>
        <ul>
            <li v-bind:key="index" v-for="(article, index) in allArticles">
                <div class="articleResult">
                    <div class="vignette">
                        <img v-bind:src="article.imageUrl" alt="">
                    </div>
                    <div class="details">
                        
                        <div>
                            <h3>{{article.title}}</h3>
                            <p>{{article.content.slice(0, 100)}}...</p>
                        </div>
                        <div>
                            <p class="auteur"><span>{{article.first_name}} {{article.name}}</span>  - {{article.dateCreated}}</p>

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
        },
        computed: {
            
            
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
    margin: 25px 0
    
}

.vignette{
    flex: 0 0 30%;
    
}

.vignette img{
    width: 100%;
    height: auto
}

.details{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 0 0 15px;
    flex: 0 0 70%;
    color: #444
}

.auteur{
    color: #67a69f;
    font-size: 0.95rem;
}

.auteur span{
    font-weight: 600
}







ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
}


</style>