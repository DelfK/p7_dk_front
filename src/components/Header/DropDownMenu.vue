<template>
    <div class='dropdown'>

    <img src="../../assets/triangle.png" alt="">
        <ul>
            <li v-on:click="goToProfile">Profil</li>
            <li v-on:click="$router.push('/nouvelarticle')">Nouvel article</li>
            <li class="moderate" v-if="moderator">Modération</li>
            <div class="btn" v-on:click="logout">Se déconnecter</div>
        </ul>

    </div>
</template>

<script>
    import http from '../../services'
    export default {
        name: 'DropDownMenu',
        data() {
            return {
                moderator: false,
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
                        if(response.data.role === 'moderator'){
                            this.moderator = true
                        }
                        return response.data.first_name  + response.data.name
                        
                })
                .then( name => {
                    this.$router.push(`/${name}`)
                })
            },
        },

        created(){
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .get(`/api/employee/${id}`)
            .then( response => {
                    if(response.data.role === 'moderator'){
                        return this.moderator = true
                    }
                    
                    
            })

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