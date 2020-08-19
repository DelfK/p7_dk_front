<template>
    <div class="container">
        <div class="small-container">
            <h1>{{articleTitle}}</h1>
            <div class="auteurDate">
                    <div class="profile">
                        <div class="auteurImg avatar"><img class="responsive-image" v-bind:src="auteurImg" alt=""></div>
                        <div class="auteur">
                        <div>{{articleAuteur}}</div>
                        <div>{{ articleDate | moment("dddd Do MMMM YYYY") }}</div>
                    </div>
                    
                </div>

                <div class="commentaire">
                    <div class="comment">
                            <a href="#comments" v-smooth-scroll="{duration: 1200, offset: 0}"><img class="responsive-image" src="../../assets/speech-bubble.svg" alt="scroll to comment"></a>
                        
                    </div>   
                </div>
                    
                <div class="partage">
                    <div class="share" v-on:click="toggleShowForm">
                        <img class="responsive-image" src="../../assets/connection.svg" alt="lien partage">
                    </div>   
                </div>
                
            </div>
            <transition name="fade">
                <ShareForm v-if="visibleShareForm"></ShareForm>
            </transition>
            
            <div class="articleImg"><img class="responsive-image" v-bind:src="articleImg" alt=""></div>
            <div class="articleContent"><p>{{articleContent}}</p></div>
            
            <Comments id="comments"></Comments>
        </div>
        

    </div>
</template>

<script>
    import http from '../../services'
    import ShareForm from './ShareForm'
    import comments from './Comments'
    
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
                employeeId: this.$route.params.employee,
                visibleShareForm: false,
               
                
                

            }
        },
        components:{
            'ShareForm': ShareForm,
            'Comments': comments
        },
        methods:{
            toggleShowForm(){
                this.visibleShareForm= !this.visibleShareForm
                
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
        },

         
    }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  opacity:1;
  transition: opacity 250ms ease-out;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.auteurDate{
    display: flex;
    justify-content: space-between

}

.auteurDate {
    margin: 30px 0 15px 0;
}

.profile {
    flex: 0 0 85%;
    display: flex
}

.commentaire, .partage{
    width: 40px
}


.auteur{
    margin: 0 0 0 13px;  
}

.auteur div:first-child{
    font-weight: 600
}

 .articleImg, .articleContent{
    margin: 20px 0;
}

.share{
    border-radius: 50%;
    background-color: #eee;
    padding: 0.3rem
}

.comment{
    border-radius: 50%;
    background-color: #FFD8D8;
    padding: 0.45rem
}

.share:hover{
    background-color: #e6e6e6
    
}

.comment:hover{
    background-color: #ffc7c7
}

.share img, .comment img{
    display: block
}

p{
    line-height:2;
    text-align: left;
    font-size: 1.1rem
}

h1{
    text-align: left
}

@media (max-width: 576px){
  .profile{
      flex: 0 0 70%
  }
}


</style>