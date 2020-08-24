<template>
    <div class="container" role="main">
        <div class="small-container" role="form">
            <h1>Rédiger un article</h1>
            <form>
                <div class="errorImg">
                    <div class="imageEdit" v-if="imageHided">
                        
                        <div role="group" class="placeholderImg">
                            <!--<img class="responsive-image" v-bind:src="contentImg" alt="">-->
                            <input aria-live="polite" title="image choisie" type="file" id="myFile" ref="file" name="filename" @change="onFileChange" accept="image/png, image/jpeg">  
                        </div> 
                            
                    </div>
                    <p class="errorMsg">{{errorMsg}}</p>
                </div>
                    
                <div class="previewImg" v-if="!imageHided">
                    <img class="responsive-image" v-bind:src="previewImg" alt="">
                    <img src="../../assets/cancel.svg" alt="" class="cancel" v-on:click="toggleImgUpload">
                </div>
                
                
                <div role="group" class="editSection" :class="{'form-group--error': $v.title.$error }">
                    <label for="title">Titre</label>
                    <input required aria-required="true" placeholder="Le titre de votre article" ref="title" type="text" id="title" @input="setTitle($event.target.value)" v-model.trim="title">
                </div>
                <template v-if="$v.title.$error">
                    <p class="error" v-if="!$v.title.required">Ce champs est requis</p>
                    <p  class="error" v-if="!$v.title.minLength">Le titre doit contenir au moins {{$v.title.$params.minLength.min}} lettres.</p>
                    <p class="error" v-if="!$v.title.maxlength">Le titre ne doit pas contenir plus de {{$v.title.$params.maxLength.max}} lettres.</p>
                </template>
                
                

                <div role="group" class="editSection" :class="{ 'form-group--error': $v.content.$error }">
                    <label for="content">Contenu</label>
                    <textarea required aria-required="true" placeholder="Le contenu de votre article" ref="content" id="content"  @input="setContent($event.target.value)" rows="20" v-model.trim="content">
                    </textarea>     
                </div>
                <template v-if="$v.content.$error">
                    <div class="error" v-if="!$v.content.required">Ce champs est requis</div>
                    <div class="error" v-if="!$v.content.minLength">Le contenu doit contenir au moins {{$v.content.$params.minLength.min}} lettres.</div>
                    <div class="error" v-if="!$v.content.maxlength">Le contenu ne doit pas contenir plus de {{$v.content.$params.minLength.min}} lettres.</div>
                </template>
                <p class="errorMsg">
                        <ul>
                            <li v-bind:key="index" v-for="(error, index) in errors">{{error}}</li>
                        </ul>
                </p>
                <div class="envoyer">
                    <button v-on:click.prevent="annuler" class="btn btn-secondary">Annuler</button> 
                    <button v-on:click.prevent="sendArticle" v-bind:class="{ inactive: !btnSubmit }" class="btn btn-primary" type="submit">Envoyer</button> 
                </div>
                
   
            </form>

        </div>
    </div>
</template>

<script>
    import http from '../../services'
    import { required, minLength, maxLength} from 'vuelidate/lib/validators'
    

    export default {
        name: "createArticle",
        data() {
            return {
                file: '',
                title: null,
                content: null,
                contentImg: null,
                storyId: null,
                submitStatus: null,
                errorMsg: null,
                btnSubmit: false,
                userId: null,
                imageHided:true,
                previewImg: null,
                isReset: false,
                errors:[]
                
            }
        },

        validations:{
        
            title:{
                required,
                minLength: minLength(6),
                maxLength: maxLength(80)
                
                
            },
            content:{
                required,
                minLength: minLength(400),
                maxLength: maxLength(4000)
            }

        },

        created(){
            const uuid = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .get(`/api/employee/${uuid}`)
            .then( response => {
                this.userId = response.data.id
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


        methods: {
            onFileChange(e) {
            
                this.file = e.target.files[0]
                this.contentImg = URL.createObjectURL(this.file);
                this.previewImg = URL.createObjectURL(this.file);
                this.imageHided = false
            

            let img = new Image();
            img.src = URL.createObjectURL(this.file)
                img.onload = () => {
                    if (img.height > img.width) {
                    this.errorMsg = "Merci de choisir une image au format paysage";
                    this.btnSubmit = false
                    this.contentImg = null
                    this.previewImg = null
                    this.imageHided = true
                    return false;
                    }
                    
                    this.errorMsg = null
                    
                    return true
                }
            },

            sendArticle() {
                if(this.btnSubmit){
                    let formData = new FormData();
                    let file = this.file

                    if(!file){
                        return http
                        .post(`/api/employee/${this.userId}/stories`,
                            {
                            
                                story:{
                                    title: this.title,
                                    content: this.content,
                                    imageUrl: this.previewImg
                                },
                                
                           }


                        )
                        .then( response =>{
                            this.storyId = response.data.story.id
                            this.title = null
                            this.content = null
                            this.previewImg = null
                            this.imageHided = true
                            this.btnSubmit = false
                            this.$v.title.$reset()
                            this.$v.content.$reset()
                            this.$router.push(`/article/${this.userId}/${this.storyId}`)
                            
                        })
                        .catch( (error) => {
                            const errors = error.response.data.errors
                            for(const error in errors){
                                this.errors.push(errors[error].msg)
                                
                            }
                        })
                            
                            
                            
                            
                    }else{
                        formData.append('title',this.title);
                        formData.append('content',this.content);
                        formData.append('image',file , file.name);
                        
                        return http
                        .post(`/api/employee/${this.userId}/stories`,
                            formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }

                        )
                        .then( ( response) =>{
                            this.validMsg = true
                            this.title = null
                            this.content = null
                            this.previewImg = null
                            this.imageHided = true
                            this.storyId = response.data.story.id
                            

                            // reset btn to default (disabled)
                            this.btnSubmit = false

                            // prevent display of error when submit OK
                            this.$v.title.$reset()
                            this.$v.content.$reset()

                            this.$router.push(`/article/${this.userId}/${this.storyId}`)
                            
                        })
                        .catch( (error) => {
                            const errors = error.response.data
                            for(const error in errors){
                                this.errors.push(errors[error].msg)
                                
                            }
                            
                        })
                           
                            
                           
                            
                            

                    }
                }
                
            },

            toggleValideMsg(){
                this.validMsg = !this.validMsg
            },
 
            setTitle(value) {
                this.title = value
                
                this.$v.title.$touch()
                if(this.$v.title.$error){
                    this.btnSubmit = false
                } else if (!this.content) {
                    this.btnSubmit = false
                } else {
                    this.btnSubmit = true
                }
                
            },

            setContent(value) {
                this.content = value
                this.$v.content.$touch()
                if(this.$v.content.$error){
                    this.btnSubmit = false
                } else  if(!this.title) {
                    this.btnSubmit = false
                } else {
                    this.btnSubmit = true
                }
            },

            annuler(){
                this.$router.push('/home')
                
            },

            toggleImgUpload(){
                this.imageHided = true
                this.previewImg = null
                this.btnSubmit = false
            }
        }
}
        
    
</script>

<style scoped>

#myFile::-webkit-file-upload-button {
  visibility: hidden;
}

#myFile{
    border: none;
    color:transparent;  
}

.errorImg{
    display: flex
}

.errorImg p{
    margin-left: 15px
}

@-moz-document url-prefix() {
  .imageEdit {
    width: auto !important;
    height: auto !important;
    border-radius: 0 !important;
  }

  #myFile{
    color:inherit !important;
    padding: 0 !important;
    font-family: inherit !important;
  
}
}

.imageEdit{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow:hidden;
    position: relative;
    z-index:1;   
}

.previewImg{
    position: relative;
    margin: 15px 0
}

.cancel{
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    width:52px;
    cursor: pointer
}



#myFile:before{
    content: "";
    background-color:rgba(0, 0, 0, 0.40);
    background-image:  url('../../assets/camera.svg');
    background-size: 30px;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left:0;
    cursor: pointer;
    
}

#myFile:hover:before{
    opacity: 0.7
}

#myFile:focus:before{
    background-color: #FFD8D8;
}

h1{
    text-align: left
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
    margin: 30px 0;
    padding: 40px 20px;
    border-top: none;
    border-right: none;
    border-left: 1px solid #eee;;
    border-bottom: none;
    border-radius:0
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
    margin-left: 20%;
    padding: 0 20px;
}

.inactive{
    background-color: #e6e6e6;
    cursor: auto
}

.inactive:hover{
    background-color: #e6e6e6;
}

ul{
    list-style-type: none;
    padding: 0;
    text-align: center
}

@media (max-width: 768px){
.editSection{
    flex-direction: column;
    align-items: flex-start
}

}


</style>