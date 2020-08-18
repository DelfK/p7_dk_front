<template>
    <div>
        <div class="commentForm">
            <h2>Répondre</h2>
            <form>
                <div class="editSection" :class="{ 'form-group--error': $v.content.$error }">
                    <label for="content">Commentaire</label>
                    <textarea rows="6" ref="content" id="content" v-model.trim="content" @input="setContent($event.target.value)">
                    </textarea>     
                </div>
                
                <div class="error" v-if="!$v.content.required">Ce champs est requis</div>
                <div class="error" v-if="!$v.content.minLength">Le contenu doit contenir au moins {{$v.content.$params.minLength.min}} lettres.</div>
                <div class="error" v-if="!$v.content.maxlength">Le contenu ne doit pas contenir plus de {{$v.content.$params.maxLength.max}} lettres.</div>
                <p class="errorMsg">
                    <ul>
                        <li v-bind:key="index" v-for="(error, index) in errors">{{error}}</li>
                    </ul>
                </p>
                
                <div class="envoyer">
                    <button v-on:click.prevent="annuler" class="btn btn-secondary">Annuler</button> 
                    <button v-on:click.prevent="sendComment" v-bind:class="{ inactive: !btnSubmit }" class="btn btn-primary" type="submit" :disabled="btnSubmit === false">Envoyer</button> 
                    <div class="validateMsg" v-if ="validMsg">Le commentaire a bien été créé<span class="fermer" v-on:click="toggleValideMsg">x</span></div>   
                </div>

            </form>

        </div>
        <div class="commentslist">
            
            <ul>
                <li v-bind:key="index" v-for="(comment, index) in comments">
                        <div class="auteurComm">
                            <img class="avatar" v-bind:src="comment.imageUrl" alt="">
                            <p>{{comment.first_name}} {{comment.name}}</p>
                        </div>
                        <div class="content">
                            <p>{{comment.content}}</p>
                            <div class="date">{{comment.dateCreated | moment("dddd Do MMMM YYYY")}}</div>
                        </div>

                </li>
            </ul>

        </div>
        
    </div>
</template>

<script>
    import http from '../../services'
    import { required, minLength, maxLength} from 'vuelidate/lib/validators'
    
    export default {
        name: 'comments',
        data() {
            return {
                storyId: this.$route.params.id,
                comments: [],
                content: null,
                validMsg: false,
                btnSubmit: false,
                errors: []
                
            }
        },

        validations:{
        
            content:{
                required,
                minLength: minLength(20),
                maxLength: maxLength(500)
                
                
            }

        },

        created(){
            return http
            .get(`/api/employee/stories/${this.storyId}/comments`)
            .then(response => {
                
                for(const comment of response.data){
                            if(!this.comments.includes(comment.id)){
                                
                                if(comment.approuve == 1){
                                    this.comments.push(comment) 
                                }
                                
                            }       
                }   
            })
        },

        watch: {
            errors: function(){
                const ctx = this
                setTimeout(
                    function(){
                        if(ctx.errors){
                            ctx.errors = []
                        }
                    }, 3500
                )
            },
        },


        methods:{
            setContent(value) {
                this.content = value
                this.btnSubmit = true
                this.$v.content.$touch()
                if(this.$v.content.$error || !value ){
                    this.btnSubmit = false
                }
            },

            annuler(){

                this.content = null;
                this.$v.content.$reset()
                this.errors = []
            },

            sendComment(){
                const id = JSON.parse(localStorage.getItem('user')).employeeId
                return http
                .post(`/api/employee/${id}/stories/${this.storyId}/comments`,
                    {
                        comment:{
                            content: this.content,
                            employeeId: id

                        }
                    }

                )
                .then( (response) => {
                    this.content = null
                    this.$v.content.$reset()
                    this.btnSubmit = false
                    this.validMsg = true
                    this.comments.unshift(response.data.comment)
                     
                })
                .catch( (error) => {
                    const errors = error.response.data.errors
                    for(const error in errors){
                        this.errors.push(errors[error].msg)
                        
                    }
                    this.btnSubmit = false  
                })
            },
            
                 

            toggleValideMsg(){
                this.validMsg = !this.validMsg
            },

        },

        

        


        
    }
</script>

<style scoped>

.commentForm{
    margin: 30px 0
}

.auteurComm{
    display: flex;
    justify-content: flex-start;
    align-items: center
}

.auteurComm p{
    color:#666
}

.content{
    font-size: 0.95rem
}

.date{
    font-size: 0.90rem;
    color: #666
}

ul{
    padding: 0;
    list-style-type: none;
    
}

.errorMsg ul{
    text-align: center
    
}

.commentslist ul img{
 margin: 0 10px 0 0 
}

.commentslist li {
    
    background: #f6f6f6;
    border-radius: 4px;
    padding: 20px;
    margin: 14px 0;
}

form{
    padding: 15px 0 15px 0;
    border-bottom: 1px solid #eee
}

.editSection{
    display:flex;
    align-items:center;
    
}

.editSection label{
    flex: 0 0 20%;
    font-size: 1.2rem;
    color: inherit;
    padding: 20px 0
}


.editSection input, .editSection textarea{
    flex:  0 0 80%;
    margin: 0 0 0 30px;
    padding: 20px;
    border-top: none;
    border-right: none;
    border-left: 1px solid #eee;;
    border-bottom: none;
    border-radius:0;
    height: auto
    
}

.editSection input:focus, .editSection textarea:focus{
    border-color: #ffd8d8;
    border-width: 2px
}



.envoyer{
    display: flex;
    justify-content: flex-end
}

.envoyer button{
    margin: 0 10px;
}

.error{
    margin: 10px 0 0 25%;
    

    
}

.inactive{
    background-color: #e6e6e6;
    cursor: auto
}

.inactive:hover{
    background-color: #e6e6e6;
}


</style>