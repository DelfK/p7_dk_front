<template>
    <div class="header_id" v-on:click="toggleMenu()">
        <p>{{profileFirstname}} {{profileName}} </p> 
        <div>
            <a href="#">
                <img class="responsive-image" v-bind:src="profileImg" alt="">    
            </a>
         </div>
    </div>
</template>

<script>
  import http from '../services'

    export default {
        name: 'WelcomeProfile',
        data() {
            return {
                profileImg: null,   
                profileFirstname: null,
                profileName: null,
                
                
            }
    
        },


        methods:{
            toggleMenu: function() {
            this.$store.commit('SHOW_HIDE_MENU')
            },
            
            close(e) {
                if (!this.$el.contains(e.target) && this.showMenu ) {
                    this.$store.commit('SHOW_HIDE_MENU')
                    console.log(this.showMenu)
            }
    }

        },

        computed: {
            showMenu() {
            return this.$store.state.showMenu
            }
        },

        created () {
            window.addEventListener("click", this.close );
            console.log('created')
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            console.log('created')
            //axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjo0LCJpYXQiOjE1OTU3OTgxMDMsImV4cCI6MTU5NTg4NDUwM30.01MtA1_RH16pq5dkewJ7G5QEH2ZjHhv1cKTE1-s3tHg'
            http.get(`/api/employee/${id}`)
            .then( (response) => {
                this.profileFirstname = response.data.first_name
                this.profileName = response.data.name
                this.profileImg = response.data.imageUrl
                console.log('réponse', response.data)
            })
            .catch((error) => {
                console.log('error', error)
                
            })
            
        
        },

        beforeDestroy() {
            window.removeEventListener("click", this.close);
        },
                

        
        
        
    }
</script>

<style scoped>
 .header_id{
     display: flex;
     justify-content: flex-end
 }

 .header_id img{
     padding: 5px;
     
 }

 .header_id p{
     margin: auto 10px;
     
 } 

 .header_id:hover{
     cursor: pointer;
     
 }


</style>