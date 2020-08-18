<template>
    <div class="header_id" v-on:click="toggleMenu()">
        <p>{{profileFirstname}} {{profileName}} </p> 
        <div class="avatar">
            <a href="#">
                <img class="responsive-image" v-bind:src="profileImg" alt="">    
            </a>
         </div>
    </div>
</template>

<script>

  import http from '../../services'

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
                // if click outsise the menu and if menu displayed
                if (!this.$el.contains(e.target) && this.showMenu ) {
                    // hide menu
                    this.$store.commit('SHOW_HIDE_MENU')   
                }
            }

        },

        computed: {
            showMenu() {
            return this.$store.state.showMenu
            }
        },

        created () {
            // hide the dropdown when user clicks outside
            window.addEventListener("click", this.close );
            
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            http.get(`/api/employee/${id}`)
            .then( (response) => {
                // diplay name, firstname and profile image
                this.profileFirstname = response.data.first_name
                this.profileName = response.data.name
                this.profileImg = response.data.imageUrl
                
            })
            .catch((error) => {
                console.log('error', error)
                
            })
        },

        beforeDestroy() {
            window.removeEventListener("click", this.close);
        }
             
    }

</script>

<style scoped>
 .header_id{
     display: flex;
     justify-content: flex-end
 }

 

 .header_id p{
     margin: auto 10px;
     color: #8f897d;
     font-size: 0.9rem
     
 } 

 .header_id:hover{
     cursor: pointer;
     
 }


</style>