<template>
    <div class="shareForm">

        <form>
            
            <input v-model="employeeName" list="employees" name="employee" id="employee">
            <datalist id="employees">
                <option v-bind:key="employee.id" v-for="employee in employees">{{employee.first_name}} {{employee.name}}</option>  
            </datalist>
            <input v-on:click.prevent="shareArticle" class="btn-primary" type="submit" value="Partager">
            <p class="validMsg" v-if="showMsg">{{msgValidation}} <span>&check;</span></p>
            
            
        </form>
        

    </div>
</template>

<script>
    import http from '../services'
import { setTimeout } from 'timers';
    export default {
        name: "ShareForm",
        data() {
            return {
                employees: null,
                employeeName:null,
                msgValidation: null,
                showMsg: false
                
                
            }
        },

        methods: {
            shareArticle() {
            
                this.employees.forEach(employee => {
                    if (this.employeeName === employee.first_name + ' ' + employee.name) {

                        const storyId = this.$route.params.id
                        const id = employee.id

                        return http
                        .post(`/api/employee/${id}/stories/${storyId}/shares`, {
                
                            share : {
                                recipientId: id
                            }
                            
                        })
                        .then( () => {

                            this.showMsg = true
                            this.msgValidation = "L'article a bien été partagé"
                            this.employeeName = null

                        })
                    }
                });
            
            }
        },

        watch: {
            showMsg: function(){
                const ctx = this
                setTimeout(
                    function(){
                        if(ctx.showMsg){
                            ctx.showMsg = false
                        }
                    }, 4000
                )
            }

        },

    
        
        created(){ 
            console.log('créé')
            return http
            .get('/api/employee')
            .then((response) => {
                if(!this.employees){
                    this.employees = response.data.employees
                        
                }
                
                console.log(this.employees)
                
            })
        },
        
        
    }
</script>

<style scoped>

form{
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  
}

form input{
    height: 36px;
    margin: 5px 0;
    width: 32%;
    font-size: 1rem;
    padding: 0 10px 0 34px;
    
    
}

form input:nth-child(3){
    
    padding: 0 10px 0 10px;
    
    
}

form input[placeholder]{
    color: #eee
}

datalist option{
    color: #90a8b8 !important;
    
}
.shareForm{
    border-bottom: 1px solid #eee;
    padding: 10px 0;
}

.validMsg{
    color: #A8DBA8;
    text-align: center
}

#employee{
    background: url('../assets/adduser.svg') no-repeat 10px 5px;
    background-size: 20px;
    color: #90a8b8
}






</style>