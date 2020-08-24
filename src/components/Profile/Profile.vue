<template>
    <div class="container">
        <div class="small-container" role="contentinfo">
            <div class="persoInfos">
                <div class="fullName">
                    <h1>{{firstName}} {{name}}</h1>
                    <p>{{position}}</p>
                    <div role="link" v-on:click="goToProfileEdit" class="btn btn-edit">Editer mon profil</div>
                    
                </div>
                
                <div class="avatarBig "><img class="responsive-image" v-bind:src="profileImg" alt=""></div>


            </div>
            
            <div class="dashboard">
                <dashboard></dashboard>
            </div>

        </div>
    </div>
</template>

<script>
    import http from '../../services'
    import Dashboard from './Dashboard'

    export default {
        name:'Profile',
        components:{
            'dashboard': Dashboard
        },
        data() {
            return {
                name: null,
                firstName: null,
                profileImg: null,
                position: null
            }
        },

        created(){
            
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .get(`/api/employee/${id}`)
            .then( response => {
                this.name = response.data.name,
                this.firstName = response.data.first_name
                this.profileImg = response.data.imageUrl
                if(!response.data.position)    {
                    this.position = 'Groupomania'
                }
                this.position = response.data.position

                    
            })
            
        },

        methods: {
            goToProfileEdit(){
                return this.$router.push(`/${this.firstName}${this.name}/edit`)
            }
        }
    }
</script>

<style scoped>
h1 {
    margin: 24px 0 12px 0;
    text-align: left
}

p{
    margin: 0 0 12px 0
}

.persoInfos{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 0 40px 0;
    border-bottom: 1px solid #eee;
    margin: 0 15px;
}

.fullName p{
    font-size: 1.5rem;
}

@media (max-width: 768px){
    .fullName p{
        font-size: 1.1rem
    }

    .fullName h1{
        font-size: 1.3rem
    }
}





</style>