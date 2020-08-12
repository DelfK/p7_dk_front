<template>
    <div class="container">
        <div class="small-container">
            <h1>Commentaires de la communauté</h1>
            <div class="noComments" v-if="noComments"><img src="../assets/interrogation.svg" alt=""></div>
            
            <ul>
                <li v-bind:key="index" v-for="(comment, index) in comments">
                        
                        <div class="auteurComm">
                            <img class="avatar" v-bind:src="comment.imageUrl" alt="">
                            <p>{{comment.first_name}} {{comment.name}}</p>
                        </div>
                        <div class="content">
                            <div class="title">{{comment.title}}</div>
                            <p>{{comment.content}}</p>  
                        </div>
                        <div class="date">{{comment.dateCreated | moment("dddd Do MMMM YYYY")}}</div>
                        <div class="moderateBtn">
                            <button v-on:click="deleteComment(comment.id, index)" class="btn btn-edit">Supprimer</button>
                            <button v-on:click="moderateComment(comment.id, comment.approuve)" v-bind:class="{ redBtn: approuve}" class="btn btn-edit approuver">{{intBtn}}</button>
                        </div>

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import http from '../services'
    export default {
        name:"moderation",
        data() {
            return {
               comments: [],
               intBtn: "Masquer",
               approuve: true,
               noComments: true
            }
        },
        created(){
            return http
            .get(`/api/employee/comments`)
            .then(response => {
                
                for(const comment of response.data){
                            
                    this.comments.push(comment)
                    this.noComments = false 
                     
                }
                
                
            })
            
            
        },
        methods:{
            deleteComment(commentId, index){
                return http
                .delete(`/api/employee/comments/${commentId}`)
                .then( () => {
                        this.comments.splice(index, 1)
                    }
                    
                )
            },
            moderateComment(commentId, approuve){
                console.log('approuve:' + approuve)
                if(approuve == 1) {
                    return http
                    .post(`/api/employee/comments/${commentId}/remove`)
                    .then( () => {
                        this.inBtn = "Approuver"
                        this.approuve = false
                    })
                } else {
                    return http
                    .post(`/api/employee/comments/${commentId}/approuve`)
                    .then( () => {
                        this.inBtn = "Masquer"
                        this.approuve = true
                    })
                }
                
            }

            
        }
    }
</script>

<style scoped>
.small-container{
    padding: 0
}
.noComments{
display:flex;
justify-content: center;
align-items: center;
height: calc(100vh - 240px)
}

.noComments img{
 width: 50%
}

.btn{
    color: #FFF;
    border-color: #FFF;
    margin-left: 5px;
    background-color: #f57f6c
    
}
.btn:hover{
    opacity: 0.8
}
.approuver{
    background-color: #92BFBA;
}
.redBtn{
    background-color: #e78f09;
    color: #FFF
}

.moderateBtn{
    position: absolute;
    bottom: 10px;
    right: 10px
}

.auteurComm{
    display: flex;
    justify-content: flex-start;
    align-items: center
}

.auteurComm p{
    color:#92BFBA
}

.content{
    font-size: 0.95rem
}

.date{
    font-size: 0.90rem;
    color: #92BFBA
}

.title{
    font-size: 1.1rem;
    font-weight: 500
}

ul{
    padding: 0;
    display:flex;
    flex-wrap: wrap;
    margin: 40px 0;
    
}

ul img{
 margin: 0 10px 0 0 
}

li {
    list-style-type: none;
    background: #f6f6f6;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 5px 5px;
    flex: 0 0 calc(50% - 15px);
    position: relative
    
    
}



</style>