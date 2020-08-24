<template>
    <div class="container">

        <div class="small-container" role="form">

            <h1>Mes infos</h1>
            <form @submit.prevent="submit">

                <div class="imageEdit">
                    <div role="group" class="avatarEdit">
                        <img class="responsive-image" v-bind:src="profileImage" alt="">
                        <input aria-live="polite" type="file" id="myFile" ref="file" name="filename" @change="onFileChange" accept="image/png, image/jpeg">  
                    </div>     
                </div>
                <p class="errorMsg">{{errorMsg}}</p>

                <div  role="group" class="editSection" :class="{'form-group--error': $v.name.$error }">
                    <label for="nom">Mon nom</label>
                    <input ref="name" type="text" id="nom" v-model="name" @input="setName($event.target.value)">
                </div>
                <div class="error" v-if="!$v.name.required">Ce champs est requis</div>

                <div  role="group" class="editSection" :class="{ 'form-group--error': $v.firstname.$error }">
                    <label for="prenom">Mon prénom</label>
                    <input ref="firstname" type="text" id="prenom" v-model="firstname" @input="setFirstname($event.target.value)">
                </div>
                <div class="error" v-if="!$v.firstname.required">Ce champs est requis</div>

                <div  role="group" class="editSection" :class="{ 'form-group--error': $v.email.$error }">
                    <label for="email">Mon email</label>
                    <input ref="email" type="email" id="email" v-model="email" @input="setEmail($event.target.value)">
                </div>
                <div class="error" v-if="!$v.email.required">Ce champs est requis</div>
                <div class="error" v-if="!$v.email.email">L'email saisi n'est pas valide</div>

                <div  role="group" class="editSection" :class="{ 'form-group--error': $v.position.$error }">
                    <label ref="position" for="poste">Mon poste</label>
                    <input type="text" id="poste" v-model="position" @input="setPosition($event.target.value)">
                </div>
                <div class="error" v-if="!$v.position.required">Ce champs est requis</div>
                
                
                <div class="envoyer">
                    <button v-on:click.prevent="annuler" class="btn btn-secondary">Annuler</button> 
                    <button v-on:click.prevent="updateProfile" v-bind:class="{ inactive: !btnSubmit }" class="btn btn-primary" type="submit">Mettre à jour</button> 
                    <p v-if="submitStatus === 'ERROR'">Merci de renseigner vos informations</p>
                    <p v-if="submitStatus === 'OK'">Merci! Vos informations ont bien été transmises</p>
                 </div>
            </form>

            <h1>Mon compte</h1>
            <div class="suppression">
                <div>
                    <p>Je ne souhaite plus venir sur Groupomania</p>  
                </div>
                <button v-on:click.prevent="supprimerCompte" class="btn btn-secondary">Désactiver mon compte</button>

            </div>
            <p class="remarque">Vous ne pourrez plus voir, créer et partager d'articles avec vos collaborateurs mais vos articles seront toujours visibles.</p>

        </div>
    </div>
</template>

<script>

    import http from '../../services'
    import { required, email} from 'vuelidate/lib/validators'
    
    export default {
        name: "EditProfile",

        data() {
            return {
                file: '',
                name: null,
                firstname: null,
                email: null,
                position: null,
                profileImage: null,
                submitStatus: null,
                errorMsg: null,
                btnSubmit: false,
                userId: null,
                
            }
        },

        validations:{
        
            email:{
                required,
                email,
                
            },
            position:{
                required
            },

            name:{
                required
            },

            firstname:{
                required
            }
        },

        created(){
            // display the user information (name, firstname, profile image and email)
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .get(`/api/employee/${id}`)
            .then( response => {
                this.name = response.data.name
                this.firstname = response.data.first_name
                this.email = response.data.email
                this.profileImage = response.data.imageUrl
                this.userId = response.data.id
                if(!response.data.position) {
                    // default if no position has been provided
                    this.position = 'Renseigner mon poste'
                }
                this.position = response.data.position       
            })
            
        },

        methods: {
            
            onFileChange(e) {
                // display a preview of the uploaded image
                this.file = e.target.files[0]
                this.profileImage = URL.createObjectURL(this.file);

                let img = new Image();
                img.src = URL.createObjectURL(this.file)
                img.onload = () => {
                    // check if image has a valid format
                    if (img.height < img.width) {
                    this.errorMsg = "Merci de choisir une image au format carré ou portrait";
                    // disable submit button if error
                    this.btnSubmit = false

                    // hide the preview
                    this.profileImage = null
                    return false;
                    }
                    this.errorMsg = null
                    this.btnSubmit = true
                    return true
                }
            },

            toggleValideMsg(){
                this.validMsg = !this.validMsg
            },
 
            setEmail(value) {
                this.email = value
                this.btnSubmit = true
                this.$v.email.$touch()
                if(this.$v.email.$error){
                    this.btnSubmit = false
                }
            },

            setName(value) {
                this.name = value
                this.btnSubmit = true
                this.$v.name.$touch()
                if(this.$v.name.$error){
                    this.btnSubmit = false
                }
            },

            setFirstname(value) {
                this.firstname = value
                this.btnSubmit = true
                this.$v.firstname.$touch()
                if(this.$v.firstname.$error){
                    this.btnSubmit = false
                }
            },

            setPosition(value) {
                this.position = value
                this.btnSubmit = true
                this.$v.position.$touch()
                if(this.$v.position.$error){
                    this.btnSubmit = false
                }
            },

            submit() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'   
                } else {
                    setTimeout(() => {
                    this.submitStatus = 'OK'
                    }, 500)
                    
                }
            },

            updateProfile() {
                if(this.btnSubmit){
                    let formData = new FormData();
                    let file = this.file
                    
                    // if no file is provided send only the body request
                    if(!file){
                        return http
                        .put(`/api/employee/${this.userId}`,
                            {
                                employee:{
                                    name: this.name,
                                    firstname: this.firstname,
                                    email: this.email,
                                    position: this.position,
                                    imageUrl: this.profileImage
                                },
                                
                           }
                        )
                        .then( response => {
                        return response.data.first_name  + response.data.name
                        })
                        .then( name => {
                            // redirect
                            this.$router.push(`/${name}`)
                        })
                    }else{
                        // if file, send the form data
                        formData.append('name',this.name);
                        formData.append('firstname',this.firstname);
                        formData.append('email',this.email);
                        formData.append('position',this.position);
                        formData.append('image', file , file.name);
                        
                        return http
                        .put(`/api/employee/${this.userId}`,
                            formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }

                        )
                        .then( response => {
                            return response.data.first_name  + response.data.name
                        })
                        .then( name => {
                            // redirect
                            console.log(name)
                            //this.$router.push(`/${name}`)
                        })

                    }
                }
                
            },

            annuler(){
                // redirect to profile page when cancel button is clicked
                const id = JSON.parse(localStorage.getItem('user')).employeeId
                return http
                // get the fullname of the user
                .get(`/api/employee/${id}`)
                .then( response => {
                        return response.data.first_name  + response.data.name
                })
                .then( name => {
                    // redirect
                    this.$router.push(`/${name}`)
                })
            },

            supprimerCompte(){
                const employeeId = JSON.parse(localStorage.getItem('user')).employeeId
                return http
                .delete(`/api/employee/${employeeId}`)
                .then( () => {
                    // logout
                    this.$store.dispatch('logout')
                    // redirect to splash screen
                    this.$router.push({ name : 'splash'})
                    // display confirmation message
                    this.$store.state.deletedAccountMsg = true
                })
            }
        }
}
        
    
</script>

<style scoped>

#myFile::-webkit-file-upload-button {
  visibility: hidden;
  

}

#myFile{
    border: none
}

.imageEdit{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow:hidden;
    position: relative;
    z-index:1;
    
}

#myFile:after{
    content: "";
    background-color:rgba(0, 0, 0, 0.40);
    background-image:  url('../../assets/camera.svg');
    background-size: 60px;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left:0;
    cursor: pointer
}

#myFile:hover:after{
    opacity: 0.7
}

h1{
    text-align: left
}

form{
    padding: 0 0 15px 0;
    border-bottom: 1px solid #eee
}

.editSection{
    display:flex;
    align-items:center;
    
}

.editSection label{
    flex: 0 0 20%;
    font-size: 1.2rem;
    border-right: 1px solid #eee;
    color: inherit;
    padding: 20px 0
}

.editSection input{
    flex:  0 0 80%;
    margin: 30px 0;
    padding: 0 20px;
    border: none
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

.suppression{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0;
}

.suppression div p {
    font-size: 1.2rem;
    font-weight: 500
}

.suppression button{
    background-color:#f57f6c;
    border-color: #f79b8c;
    color: #FFF
}

.suppression button:hover{
    background-color:#f79b8c;
    border-color: #f8a99c
}


h2{
    margin: 0
}

@media (max-width: 768px){
     .editSection{
         flex-direction: column;
         align-items: flex-start
     }

     .editSection label{
         border-bottom: 1px solid #eee;
         border-right: none;
         width: 100%
     }

     .suppression{
         flex-direction: column;
         
     }

     
}




</style>