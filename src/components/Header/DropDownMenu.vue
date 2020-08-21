<template>

    <div class='dropdown'>

    <img src="../../assets/down-triangle-white.svg" alt="">
        <ul role="menu">
            <li role="menuitem" v-on:click="goToProfile">Profil</li>
            <li  role="menuitem" v-on:click="$router.push('/nouvelarticle')">Nouvel article</li>
            <li role="menuitem" v-on:click="$router.push('/commentaires')" class="moderate" v-if="moderate">Commentaires</li>
            <li role="menuitem" class="btn" v-on:click="logout">Se déconnecter</li>
        </ul>

    </div>

</template>

<script>
    import http from '../../services'

    export default {
        name: 'DropDownMenu',
        

        computed: {
            // if user is the moderator display the menu "Commentaires"
            moderate() {
            return this.$store.state.moderator
            }
        },

        methods: {
            logout () {
            this.$store.dispatch('logout')
            .then( () =>{
                this.$router.push({ name : 'splash'})
                this.$store.state.showValidSignIn = false
            })
            },

            goToProfile(){
                const id = JSON.parse(localStorage.getItem('user')).employeeId
                return http
                .get(`/api/employee/${id}`)
                .then( response => {
                        return response.data.first_name  + response.data.name
                        
                })
                .then( name => {
                    this.$router.push(`/${name}`)
                })
            },
        }
    }
</script>

<style scoped>
.dropdown{
    width: 200px;
    border: 1px solid #eee;
    padding: 2px 0;
    position: absolute;
    top: 65px;
    right: 15px;
    background-color: #5d9f98;
    
    
}

.dropdown img{
    position: absolute;
    width: 13%;
    top: 3%;
    left: 50%;
    transform: translate(-50%, -50%)
}

.dropdown .btn{
    cursor: pointer;
    font-weight: 400;
    color: #222
}

ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
}

ul li{
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    color: #FFF;
    font-size: 0.9rem;
}

ul li:hover, .dropdown .btn:hover{
    opacity: 0.8;
    cursor: pointer
    
}

ul li:last-child{
    border: none;
}

.moderate{
    color:#222
}

</style>