<template>
    <div class="container">
        <div class="small-container">
            <h1>{{articleTitle}}</h1>
            <div class="auteurDate">
                <div class="auteurImg avatar"><img class="responsive-image" v-bind:src="auteurImg" alt=""></div>
                <div class="auteur">
                    <div>{{articleAuteur}}</div>
                    <div>{{articleDate}}</div>
                </div>
            </div>
            <div class="articleImg"><img class="responsive-image" v-bind:src="articleImg" alt=""></div>
            <div class="articleContent"><p>{{articleContent}}</p></div>
        </div>
        

    </div>
</template>

<script>
    import http from '../services'
    export default {
        name: 'Article',
        data() {
            return {
                articleTitle: null,
                articleAuteur:null,
                articleDate:null,
                auteurImg: null,
                articleImg: null,
                articleContent: null,
                id: this.$route.params.id,
                employeeId: this.$route.params.employee

            }
        },

        created(){
            return http
            .get(`/api/employee/${this.employeeId}/stories/${this.id}`)
            .then( response => {
                    console.log(response.data)
                    this.articleTitle =  response.data.title
                    this.articleAuteur =  response.data.first_name + ' ' + response.data.name
                    this.articleDate =  response.data.dateCreated
                    this.auteurImg =  response.data.profileImage
                    this.articleImg =  response.data.imageUrl
                    this.articleContent =  response.data.content
                
                }

            )
        }
    }
</script>

<style scoped>
.auteurDate{
    display: flex;
}

.auteur{
    margin: 0 0 0 13px
}

.auteur div:first-child{
    font-weight: 600
}

 .articleImg, .articleContent{
    margin: 20px 0;
}

.auteurDate {
    margin: 30px 0 45px 0
}

p{
    line-height:2;
    text-align: left;
    font-size: 1.1rem
}

h1{
    text-align: left
}
</style>