<template>
    <div class="container">
        <div class="small-container">
            <h1>S'inscrire</h1>
            <form @submit.prevent="submit">
                <div :class="{ 'form-group--error': $v.firstname.$error }">
                    <label for="firstname">Prénom</label>
                    <input  type="text" id="firstname" v-model.trim="firstname" @input="setFirstname($event.target.value)">  
                </div>
                
                    <div class="error" v-if="!$v.firstname.required">Ce champs est requis</div>
                    <div class="error" v-if="!$v.firstname.minLength">Votre prénom doit contenir au moins {{$v.firstname.$params.minLength.min}} lettres.</div>
                    <div class="error" v-if="!$v.firstname.maxLength">Votre prénom ne doit pas contenir plus de {{$v.firstname.$params.maxLength.max}} lettres.</div>
                
                
                <div :class="{ 'form-group--error': $v.name.$error }">
                    <label for="name">Nom</label>
                    <input  type="text" id="name" v-model.trim="name" @input="setName($event.target.value)">
                </div>
             
                    <div class="error" v-if="!$v.name.required">Ce champs est requis</div>
                    <div class="error" v-if="!$v.name.minLength">Votre nom doit contenir au moins {{$v.name.$params.minLength.min}} lettres.</div>
                    <div class="error" v-if="!$v.name.maxLength">Votre nom ne doit pas contenir plus de {{$v.name.$params.maxLength.max}} lettres.</div>

              
                
                <div :class="{ 'form-group--error': $v.email.$error }">
                    <label for="email">Email</label>
                    <input  type="email" id="email" v-model.trim="email" @input="setEmail($event.target.value)">
                </div>
                
                    <div class="error" v-if="!$v.email.required">Ce champs est requis</div>
                    <div class="error" v-if="!$v.email.email">L'email saisi n'est pas valide</div>
                    <div class="error" v-if="!$v.email.maxLength">Votre email ne peut pas contenir plus de {{$v.email.$params.maxLength.max}} lettres.</div>
                
                
                <div :class="{ 'form-group--error': $v.password.$error }">
                    <label for="password" >Mot de passe</label>
                    <input type="password" id="password" v-model.trim="password" @input="setPassword($event.target.value)">
                </div>
                
                    <div class="error" v-if="!$v.password.required">Ce champs est requis</div>
                    <div class="error" v-if="!$v.password.minLength">Votre mot de passe doit contenir au moins {{$v.password.$params.minLength.min}} lettres.</div>
                    <div class="error" v-if="!$v.password.maxLength">Votre mot de passe ne doit pas contenir plus de {{$v.password.$params.maxLength.max}} lettres.</div>
                    <div class="error" v-if="!$v.password.alphaNum">Votre mot de passe doit contenir au moins un chiffre</div>
                
                <div class="envoyer">
                    <button v-bind:class="{ inactive: !btnSubmit }" v-on:click="sendData" class="btn btn-primary" type="submit" :disabled="btnSubmit === false">Envoyer</button>
                    <p class="validateMsg" v-if="submitStatus === 'OK' && emailUnique">Merci! Vos informations ont bien été transmises</p>
                    <p class="errorMsg">{{errorUserExist}}</p>
                    <p class="errorMsg">
                        <ul>
                            <li v-bind:key="index" v-for="(error, index) in errors">{{error}}</li>
                        </ul>
                    </p>    
                </div>
            </form>
        </div>   
    </div>
</template>

<script>

    import axios from 'axios'
    import { required, minLength, maxLength, email, alphaNum} from 'vuelidate/lib/validators'

    export default {
        name: 'signin',

        data: function(){
            return{
                firstname: '',
                name:'',
                email:'',
                password:'',
                submitStatus: null,
                emailUnique: null,
                errorUserExist: null,
                btnSubmit: false,
                errors: [ ]
            }
        },

        validations:{
            firstname:{
                required,
                minLength: minLength(2),
                maxLength: maxLength(30)
            },

            name:{
                required,
                minLength: minLength(4),
                maxLength: maxLength(30)
            },

            email:{
                required,
                email,
                maxLength: maxLength(30)
            },

            password:{
                required,
                minLength: minLength(8),
                maxLength: maxLength(20),
                alphaNum
            }
        },

        watch: {
                // hide errors after a timeout of 3500
                errors: function(){
                    const ctx = this
                    setTimeout(
                        function(){
                            if(ctx.errors){
                                ctx.errors = false
                            }
                        }, 3500
                    )
                },
        },

        methods: {

            setFirstname(value) {
                this.firstname = value
                this.btnSubmit = true
                this.$v.firstname.$touch()

                // enable submit button only if no errors
                if(this.$v.firstname.$error || !this.name || !this.email || !this.password || !value){
                    this.btnSubmit = false
                }
            },

            setName(value) {
                this.name = value
                this.btnSubmit = true
                this.$v.name.$touch()

                // enable submit button only if no errors
                if(this.$v.name.$error || !this.firstname || !this.email || !this.password || !value){
                    this.btnSubmit = false
                }
            },

            setEmail(value) {
                this.email = value
                this.btnSubmit = true
                this.$v.email.$touch()

                // enable submit button only if no errors
                if(this.$v.email.$error || !this.name || !this.firstname || !this.password || !value){
                    this.btnSubmit = false
                }
            },

            setPassword(value) {
                this.password = value
                this.btnSubmit = true
                this.$v.password.$touch()

                // enable submit button only if no errors
                if(this.$v.password.$error || !this.name || !this.email || !this.firstname || !value){
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

            sendData: function(){

                axios.post('http://localhost:4000/api/employee/signin', {
                    
                        employee : {
                            firstname: this.firstname,
                            name: this.name,
                            email: this.email,
                            password: this.password
                            }
                    
                })
                .then( () => {

                        this.emailUnique = true
                        this.name = null
                        this.firstname = null
                        this.email = null
                        this.password = null
                        this.btnSubmit = false

                        //redirect to login page
                        this.$router.push({ name: 'login' });

                        // display welcome message on the login page
                        this.$store.state.showValidSignIn = true
    
                })
                .catch( (error) => {
                    // save error when user exists 
                    this.errorUserExist = error.response.data.error

                    // save errors from server in array to display in UI
                    const errors = error.response.data
                    for(const error in errors){
                        this.errors.push(errors[error].msg)
                        
                    }

                    this.btnSubmit = false

                    // reset all errors
                    this.$v.name.$reset()
                    this.$v.firstname.$reset()
                    this.$v.email.$reset()
                    this.$v.password.$reset()
                    
                    this.errorNotValid = error.response.data
                    this.emailUnique = false
                    
                    
                });
                
            }
        }
    }
</script>

<style scoped>

    ul{
        padding: 0;
        list-style-type: none;
    }

    .container{
        margin: 80px 0 0 0;
    }

    .envoyer{
        text-align:center
    }

    .inactive{
    background-color: #e6e6e6;
    cursor: auto
    }

    .inactive:hover{
        background-color: #e6e6e6;
    }





</style>
