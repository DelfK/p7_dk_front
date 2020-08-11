<template>
    <div class="container">
        <div class="small-container">
            <h1>Commentaires de la communauté</h1>
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
                            <button v-on:click="moderateComment" v-bind:class="{ redBtn: approuve}" class="btn btn-edit approuver">{{intBtn}}</button>
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
               approuve: true
            }
        },
        created(){
            return http
            .get(`/api/employee/comments`)
            .then(response => {
                
                for(const comment of response.data){
                            
                    this.comments.push(comment) 
                     
                }   
            })
        },
        methods:{
            deleteComment(commentId, index){
                return http
                .delete(`/api/employee/stories/comments/${commentId}`)
                .then( () => {
                        this.comments.splice(index, 1)
                    }
                    
                )
            }
        }
    }
</script>

<style scoped>
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
    background-color: #f8a300;
    color: #555
}

.moderateBtn{
    position: absolute;
    bottom: 8px;
    right: 8px
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
    margin: 30px 0;
    
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