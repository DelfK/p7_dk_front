<template>
    <div class="container">
        <div class="small-container">
            <h1>S'inscrire</h1>
            <form>
                <div :class="{ 'form-group--error': $v.firstname.$error }">
                    <label for="firstname">Prénom</label>
                    <input  type="text" id="firstname" v-model.trim="firstname" @input="setName($event.target.value)">  
                </div>
                <div class="error" v-if="!$v.firstname.required">Field is required</div>
                <div class="error" v-if="!$v.firstname.minLength">Name must have at least {{$v.firstname.$params.minLength.min}} letters.</div>
  
                <div>
                    <label for="name">Nom</label>
                    <input  type="text" id="name" required minlength="2" maxlength="38" v-model="name">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input  type="email" id="email" required maxlength="30" v-model="email">
                </div>
                <div>
                    <label for="password" >Mot de passe</label>
                    <input type="password" id="password" required minlength="8" maxlength="38" v-model="password">
                </div>
                <div class="envoyer">
                    <button v-on:click="sendData" class="btn btn-primary" type="submit">Envoyer</button>
                </div>
            </form>
            
            
            

        </div>
        

    </div>

</template>
<script>
import axios from 'axios'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'



export default {
    name: 'signin',
    data: function(){
        return{
            firstname: '',
            name:'',
            email:'',
            password:''
        }
    },

    validations:{
        firstname:{
            required,
            minLength: minLength(4),
            maxLength: maxLength(20)
        }
    },
    methods: {
        setName(value) {
            this.firstname = value
            this.$v.firstname.$touch()
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
                this.firstname = '';
                this.name = '';
                this.email = '';
                this.password = '';
                this.$router.push({ name: 'login' });
                
            })
            .catch( (error) => {
                console.log(error);
                
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
