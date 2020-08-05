<template>
    <div class="container">
        <div class="small-container">
            <h1>Mes infos</h1>
            <form class="editProfile">
                <div class="imageEdit">
                    <div class="avatarEdit">
                        <img class="responsive-image" v-bind:src="profileImage" alt="">
                        <input type="file" id="myFile" name="filename" @change="onFileChange" accept="image/png, image/jpeg">
                    </div>
                    
                </div>
                <div class="editSection">
                    <label for="email">Mon email</label>
                    <input :placeholder="email" type="email" id="email" v-model="email" >
                </div>
                <div class="editSection">
                    <label for="poste">Mon poste</label>
                    <input type="text" id="poste" v-model="position">
                </div>
                
                <div class="envoyer">
                    <button v-on:click.prevent="updateProfile" class="btn btn-primary" type="submit">Mettre à jour</button>  
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    import http from '../../services'
    export default {
        name: "EditProfile",
        data() {
            return {
                email: null,
                position: null,
                profileImage: null
            }
        },

        created(){
            
            const id = JSON.parse(localStorage.getItem('user')).employeeId
            return http
            .get(`/api/employee/${id}`)
            .then( response => {
                console.log(response.data)
                this.email = response.data.email
                this.profileImage = response.data.imageUrl
                if(!response.data.position)    {
                    this.position = 'Renseigner mon poste'
                }
                this.position = response.data.position

                    
            })
            
        },

        methods: {
            onFileChange(e) {
            const file = e.target.files[0];
            this.profileImage = URL.createObjectURL(file);

            let img = new Image();
            img.src = URL.createObjectURL(file)
            img.onload = () => {
                if (img.height < img.width) {
                
                alert("Your image must be square or portrait");
                img.width = 0
                img.height = 0

                return false;
                
                }
                alert("Valid format");
                return true
            }
            

            
            
            
            
            
            
            }
        }
}
        
    
</script>

<style scoped>

#myFile::-webkit-file-upload-button {
  visibility: hidden;
  

}

#myFile{
    border: none
}

.imageEdit{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow:hidden;
    position: relative;
    z-index:1;
    
}

#myFile:after{
    content: "";
    background-color:rgba(0, 0, 0, 0.40);
    background-image:  url('../../assets/camera.svg');
    background-size: 60px;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left:0;
    cursor: pointer
}

#myFile:hover:after{
    opacity: 0.7
}

h1{
    text-align: left
}

form{
    padding: 0 0 15px 0;
    border-bottom: 1px solid #eee
}

.editSection{
    display:flex;
    align-items:center;
    
}

.editSection label{
    flex: 0 0 20%;
    font-size: 1.2rem;
    border-right: 1px solid #eee;
    color: inherit;
    padding: 20px 0
}

.editSection input{
    flex:  0 0 80%;
    margin: 30px 0;
    padding: 0 20px;
    border: none
}

.envoyer{
    display: flex;
    justify-content: flex-end
}


</style>