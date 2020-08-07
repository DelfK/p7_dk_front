<template>
    <div class="container">
        <div class="small-container">
            <h1>Se connecter</h1>
            <form @submit.prevent="submit">
                
                <div :class="{ 'form-group--error': $v.email.$error }">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.trim="email" @input="setEmail($event.target.value)">
                </div>
                <div class="error" v-if="!$v.email.required">Ce champs est requis</div>
                <div class="error" v-if="!$v.email.email">L'email saisi n'est pas valide</div>
                
                <div :class="{ 'form-group--error': $v.password.$error }">
                    <label for="password" >Mot de passe</label>
                    <input type="password" id="password" v-model.trim="password" @input="setPassword($event.target.value)">
                </div>
                <div class="error" v-if="!$v.password.required">Ce champs est requis</div>
                
                <div class="envoyer">
                    <button v-on:click.prevent="login" class="btn btn-primary" type="submit">Envoyer</button>
                    
                    <p v-if="submitStatus === 'ERROR'">Merci de renseigner vos informations</p>
                    <p class="errorMsg">{{$store.state.errMsg}}</p>
                    
                </div>
            </form>
            
            
            

        </div>
        

    </div>

</template>
<script>


import { required, email} from 'vuelidate/lib/validators'




export default {
    name: 'login',
    data: function(){
        return{
            email: 'rachel.green@centralperk.com',
            password: 'ross',
            submitStatus: null
            
            
        }
    },

    validations:{
        
        email:{
            required,
            email,
            
        },
        password:{
            required
        }
    },
    methods: {
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
            }
        },

        login () {
            this.$store.dispatch('login', {
                employee : {
                    email: this.email,
                    password: this.password
                }
            })
            .then(() => {
              this.$router.push({ name: 'home' })
            })
        },
        
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
