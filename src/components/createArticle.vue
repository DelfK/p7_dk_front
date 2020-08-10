<template>
    <div class="container">
        <div class="small-container">
            <h1>Rédiger un article</h1>
            <form>
                <div class="errorImg">
                    <div class="imageEdit" v-if="imageHided">
                        
                        <div class="placeholderImg">
                            <!--<img class="responsive-image" v-bind:src="contentImg" alt="">-->
                            <input title="image choisie" type="file" id="myFile" ref="file" name="filename" @change="onFileChange" accept="image/png, image/jpeg">  
                        </div> 
                            
                    </div>
                    <p class="errorMsg">{{errorMsg}}</p>
                </div>
                    
                <div class="previewImg" v-if="!imageHided">
                    <img class="responsive-image" v-bind:src="previewImg" alt="">
                    <img src="../assets/cancel.svg" alt="" class="cancel" v-on:click="toggleImgUpload">
                </div>
                
                
                <div class="editSection" :class="{'form-group--error': $v.title.$error }">
                    <label for="title">Titre</label>
                    <input ref="title" type="text" id="title" v-model.trim="title" @input="setTitle($event.target.value)">
                </div>
                <template v-if="$v.title.$error">
                    <p class="error" v-if="!$v.title.required">Ce champs est requis</p>
                    <p  class="error" v-if="!$v.title.minLength">Le titre doit contenir au moins {{$v.title.$params.minLength.min}} lettres.</p>
                    <p class="error" v-if="!$v.title.maxlength">Le titre ne doit pas contenir plus de {{$v.title.$params.minLength.min}} lettres.</p>
                </template>
                
                

                <div class="editSection" :class="{ 'form-group--error': $v.content.$error }">
                    <label for="content">Contenu</label>
                    <textarea ref="content" id="content" v-model.trim="content" @input="setContent($event.target.value)" rows="20">
                    </textarea>     
                </div>
                <template v-if="$v.content.$error">
                    <div class="error" v-if="!$v.content.required">Ce champs est requis</div>
                    <div class="error" v-if="!$v.content.minLength">Le contenu doit contenir au moins {{$v.content.$params.minLength.min}} lettres.</div>
                    <div class="error" v-if="!$v.content.maxlength">Le contenu ne doit pas contenir plus de {{$v.content.$params.minLength.min}} lettres.</div>
                </template>
                
                
                <div class="envoyer">
                    <button v-on:click.prevent="annuler" class="btn btn-secondary">Annuler</button> 
                    <button v-on:click.prevent="sendArticle" v-bind:class="{ inactive: !btnSubmit }" class="btn btn-primary" type="submit">Envoyer</button> 
                    <div class="validateMsg" v-if ="validMsg">L'article a bien été créé<span class="fermer" v-on:click="toggleValideMsg">x</span></div>
                
                    
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    import http from '../services'
    import { required, minLength, maxLength} from 'vuelidate/lib/validators'
    

    export default {
        name: "createArticle",
        data() {
            return {
                file: '',
                title: null,
                content: null,
                contentImg: null,
                submitStatus: null,
                errorMsg: null,
                validMsg: false,
                btnSubmit: false,
                userId: null,
                imageHided:true,
                previewImg: null,
                isReset: false
                
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
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            this.userId = id   
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
                    if(!this.$v.title.$error && !this.$v.content.$error ){
                        this.btnSubmit = true
                    }
                    
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
                        .then( () =>{
                            this.validMsg = true
                            console.log("story créée")
                            this.title = null
                            this.content = null
                            this.previewImg = null
                            this.imageHided = true
                            this.btnSubmit = false
                            this.$v.title.$reset()
                            this.$v.content.$reset()
                            
                            
                            
                            
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
                        .then( () =>{
                            this.validMsg = true
                            console.log("story créée")
                            this.title = null
                            this.content = null
                            this.previewImg = null
                            this.imageHided = true

                            // reset btn to default (disabled)
                            this.btnSubmit = false

                            // prevent display of error when submit OK
                            this.$v.title.$reset()
                            this.$v.content.$reset()
                           
                            
                           
                            
                            
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
                if(this.$v.title.$error || this.$v.content.$error || !value){
                    this.btnSubmit = false
                } else {
                    this.btnSubmit = true
                }
                
            },

            setContent(value) {
                this.content = value
                this.$v.content.$touch()
                if(this.$v.content.$error || this.$v.title.$error || !value ){
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
    background-image:  url('../assets/camera.svg');
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


</style>