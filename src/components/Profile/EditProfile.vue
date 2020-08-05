<template>
    <div class="container">
        <div class="small-container">
            <h1>Mes infos</h1>
            <form @submit.prevent="submit">
                <div class="imageEdit">
                    <div class="avatarEdit">
                        <img class="responsive-image" v-bind:src="profileImage" alt="">
                        <input type="file" id="myFile" name="filename" @change="onFileChange" accept="image/png, image/jpeg">
                        
                    </div>     
                </div>
                <p class="errorMsg">{{errorMsg}}</p> 
                <div class="editSection" :class="{ 'form-group--error': $v.name.$error }">
                    <label for="nom">Mon nom</label>
                    <input type="text" id="nom" v-model="name" @input="setName($event.target.value)">
                </div>
                <div class="editSection" :class="{ 'form-group--error': $v.firstname.$error }">
                    <label for="prenom">Mon prénom</label>
                    <input type="text" id="prenom" v-model="firstname" @input="setFirstname($event.target.value)">
                </div>
                <div class="editSection" :class="{ 'form-group--error': $v.email.$error }">
                    <label for="email">Mon email</label>
                    <input type="email" id="email" v-model="email" @input="setEmail($event.target.value)">
                </div>
                <div class="error" v-if="!$v.email.required">Ce champs est requis</div>
                <div class="error" v-if="!$v.email.email">L'email saisi n'est pas valide</div>

                <div class="editSection" :class="{ 'form-group--error': $v.position.$error }">
                    <label for="poste">Mon poste</label>
                    <input type="text" id="poste" v-model="position" @input="setPosition($event.target.value)">
                </div>
                <div class="error" v-if="!$v.position.required">Ce champs est requis</div>
                
                
                <div class="envoyer">
                    <button v-on:click.prevent="annuler" v-bind:class="{ inactive: !btnSubmit }" class="btn btn-secondary">Annuler</button> 
                    <button v-on:click.prevent="updateProfile" v-bind:class="{ inactive: !btnSubmit }" class="btn btn-primary" type="submit">Mettre à jour</button> 
                    <p v-if="submitStatus === 'ERROR'">Merci de renseigner vos informations</p>
                    <p v-if="validMsg">{{validMsg}}</p>
                    
                </div>
            </form>

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
                name: null,
                firstname:null,
                email: null,
                position: null,
                profileImage: null,
                submitStatus: null,
                errorMsg: null,
                validMsg: null,
                btnSubmit: true,
                userId: null
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
            
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .get(`/api/employee/${id}`)
            .then( response => {
                console.log(response.data)
                this.name = response.data.name
                this.firstname = response.data.first_name
                this.email = response.data.email
                this.profileImage = response.data.imageUrl
                this.userId = response.data.id
                if(!response.data.position)    {
                    this.position = 'Renseigner mon poste'
                }
                this.position = response.data.position

                    
            })
            
        },

        methods: {
            onFileChange(e) {
            const file = e.target.files[0];
            this.profileImage = URL.createObjectURL(file);

            let img = new Image();
            img.src = URL.createObjectURL(file)
                img.onload = () => {
                    if (img.height < img.width) {
                    this.errorMsg = "Merci de choisir une image au format carré ou portrait";
                    this.btnSubmit = false
                    this.profileImage = null

                    return false;
                    
                    }
                    this.errorMsg = null
                    this.btnSubmit = true
                    return true
                }
            },

            setEmail(value) {
                this.email = value
                this.$v.email.$touch()
            },

            setName(value) {
                this.name = value
                this.$v.name.$touch()
            },

            setFirstname(value) {
                this.firstname = value
                this.$v.firstname.$touch()
            },

            setPosition(value) {
                this.position = value
                this.$v.position.$touch()
            },

            submit() {
                console.log('submit!')
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                }
            },

            updateProfile() {
                if(this.btnSubmit){
                    console.log('avatar:' +this.profileImage) 
                    console.log('email:' +this.email) 
                    console.log('position:' +this.position) 

                    return http
                    .put(`/api/employee/${this.userId}`,
                    {
                        employee : {
                                name: this.name,
                                firstname: this.firstname,
                                email: this.email,
                                position: this.position ,
                                image: this.profileImage  
                            }
                    })
                    .then( (response) => {
                        
                        console.log('server:' + response.data)
                            
                    })


                }
            },

            annuler(){
                const id = JSON.parse(localStorage.getItem('user')).employeeId
                return http
                .get(`/api/employee/${id}`)
                .then( response => {
                        return response.data.first_name  + response.data.name
                })
                .then( name => {
                    this.$router.push(`/${name}`)
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
    background-color: #ccc;
    cursor: auto
}

.inactive:hover{
    background-color: #ccc;
}


</style>