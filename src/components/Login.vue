<template>
    <div class="container">
        <div class="small-container" role="form">
            <h1>Se connecter</h1>
            <form>
                <!-- Welcome message for new users -->
                <div v-if="this.$store.state.showValidSignIn" class="welcomeMessage">Bienvenue sur Groupomania, vous pouvez maintenant vous connecter pour lire et partager des articles</div>
            
                <div role="group" :class="{ 'form-group--error': $v.email.$error }">
                    <label for="email">Email <span class="instructions">*requis</span></label>
                    <input required aria-required="true" type="email" id="email" v-model.trim="email" @input="setEmail($event.target.value)">
                </div>
                <div class="error" v-if="!$v.email.required">Ce champs est requis</div>
                <div class="error" v-if="!$v.email.email">L'email saisi n'est pas valide</div>
                
                <div role="group" :class="{ 'form-group--error': $v.password.$error }">
                    <label for="password">Mot de passe <span class="instructions">* plus de 8 caractères alphanumériques</span></label>
                    <input required aria-required="true" type="password" id="password" v-model.trim="password" @input="setPassword($event.target.value)">
                </div>
                <div class="error" v-if="!$v.password.required">Ce champs est requis</div>
                 <div class="envoyer">
                    <button v-bind:class="{ inactive: !btnSubmit }" v-on:click.prevent="login" class="btn btn-primary" type="submit" :disabled="btnSubmit === false">Envoyer</button>
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
                email: null,
                password: null,
                submitStatus: null,
                btnSubmit: false
                
                
            }
        },

        validations:{
            
            email:{
                required,
                email,
                
            },
            password:{
                required,
                
            }
        },

        methods: {
            setEmail(value) {
                this.email = value
                this.btnSubmit = true
                this.$v.email.$touch()
                if(this.$v.email.$error || !this.password || !value){
                        this.btnSubmit = false
                    }
            },
            setPassword(value) {
                this.password = value
                this.btnSubmit = true
                this.$v.password.$touch()
                if(this.$v.password.$error || !this.email || !value){
                        this.btnSubmit = false
                    }
            },
        
            login () {
                this.$store.dispatch('login', {
                    // credentials for the login action in the store
                    employee : {
                        email: this.email,
                        password: this.password
                    }
                })
                .then(() => {
                // redirect to homepage
                this.$router.push({ name: 'home' })
                })
                
            },
            
        },

        created(){
            this.$store.state.errMsg = null
        },

        beforeDestroy(){
            this.$store.state.showValidSignIn = false
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

    .inactive{
    background-color: #e6e6e6;
    cursor: auto
    }

    .inactive:hover{
        background-color: #e6e6e6;
    }

    .welcomeMessage{
        background-color: #A8DBA8;
        color:#f6f6f6;
        padding: 20px;
        border-radius: 2px;
        text-align: center;
        font-size: 1.25rem;
        margin: 0 0 30px 0 
    }






</style>
