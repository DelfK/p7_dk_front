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
                            <button v-bind:class="{redBtn : comment.hide}" v-on:click="moderateComment(comment.id, comment.approuve, comment)" class="btn btn-edit approuver">{{comment.btnTitle}}</button>
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
               noComments: true,
               btnTitleHide: "Bloquer",
               btnTitleApprouve: "Approuver"
            }
        },

        created(){
            return http
            .get(`/api/employee/comments`)
            .then(response => {
                
                for(const comment of response.data){       
                    this.noComments = false 
                    if(comment.approuve == 1){
                        comment.btnTitle = this.btnTitleHide
                        comment.hide = true 
                    } else {
                        comment.btnTitle = this.btnTitleApprouve
                        comment.hide = false
                    }
                    this.comments.push(comment)
                     
                }
                
                
            })  
        },

        methods:{
            deleteComment(commentId, index){
                return http
                // remove from DB
                .delete(`/api/employee/comments/${commentId}`)
                .then( () => {
                        // remove comment from UI
                        this.comments.splice(index, 1)
                    }
                    
                )
            },
            
            moderateComment(commentId, approuve, comment){
                // hide comment from UI
                if(approuve == 1) {
                    return http
                    // hide comment
                    .post(`/api/employee/comments/${commentId}/remove`)
                    .then( () => {
                        // change button name
                        comment.btnTitle = this.btnTitleApprouve

                        // remove the css class redBtn
                        comment.hide = false

                        comment.approuve = 0
                    })

                // Approuve comment
                } else {
                    return http
                    .post(`/api/employee/comments/${commentId}/approuve`)
                    .then( () => {
                        // change button name
                        comment.btnTitle = this.btnTitleHide

                        // add the css class redBtn
                        comment.hide = true

                        comment.approuve = 1
                        
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