<template>
    <div class='dropdown'>

    <img src="../../assets/triangle.png" alt="">
        <ul>
            <li v-on:click="goToProfile">Profil</li>
            <li>Paramètres</li>
            <li v-if="moderator"> Commentaires</li>
            <div class="btn" v-on:click="logout">Déconnexion</div>
        </ul>

    </div>
</template>

<script>
    import http from '../../services'
    export default {
        name: 'DropDownMenu',
        data() {
            return {
                moderator: false
            }
        },

        methods: {
            logout () {
            this.$store.dispatch('logout')
            .then( () =>{
                this.$router.push({ name : 'splash'})
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
            }
        }
        
    }
</script>

<style scoped>
.dropdown{
    width: 200px;
    border: 1px solid #eee;
    padding: 2px 0;
    position: absolute;
    top: 70px;
    right: 15px;
    background-color: #92BFBA;
    font-size: 0.9rem;
    
}

.dropdown img{
    position: absolute;
    width: 10%;
    top: -4%;
    left: 50%;
    transform: translate(-50%, -50%)
}

.dropdown .btn{
    cursor: pointer;
    font-weight: 400;
}

ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
}

ul li{
    padding: 8px 10px;
    border-bottom: 1px solid #eee;
    color: #FFF;
}

ul li:hover, .dropdown .btn:hover{
    font-weight: 600;
    cursor: pointer
    
}

ul li:last-child{
    border: none;
}

</style>