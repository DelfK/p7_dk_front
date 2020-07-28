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
                    <button v-on:click="sendData" class="btn btn-primary" type="submit">Envoyer</button>
                    
                    <p v-if="submitStatus === 'OK' && emailUnique">Merci! Vos informations ont bien été transmises</p>
                    <p class="errorMsg">{{errorMsg}}</p>
  
                    
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
            errorMsg: null
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
    methods: {
        setFirstname(value) {
            this.firstname = value
            this.$v.firstname.$touch()
        },
        setName(value) {
            this.name = value
            this.$v.name.$touch()
        },
        setEmail(value) {
            this.email = value
            this.$v.email.$touch()
        },
        setPassword(value) {
            this.password = value
            this.$v.password.$touch()
        },
        submit() {
            console.log('submit!')
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
            .then( (response) => {

                    console.log(response.data);
                    this.emailUnique = true
                    this.$router.push({ name: 'login' });
 
            })
            .catch( (error) => {
                this.errorMsg = error.response.data.error
                this.emailUnique = false
                
                
            });
            
        }
    }
}
</script>

<style scoped>

    .container{
        margin: 80px 0 0 0;
    }

    .envoyer{
        text-align:center
    }






</style>
