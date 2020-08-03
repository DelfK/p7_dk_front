<template>
    <div>
        <form>
            
            <input v-model="employeeName" list="employees" name="employee" id="employee">
            <datalist id="employees">
                <option v-bind:key="index" v-for="(employee, index) in employees"> {{employee.first_name}} {{employee.name}}</option>  
            </datalist>
            <input class="btn-primary" type="submit" value="Partager">
            
        </form>
        

    </div>
</template>

<script>
    import http from '../services'
    export default {
        name: "ShareForm",
        data() {
            return {
                employees: null,
                employeeName:null,
                
            }
        },
        methods:{
            shareArticle(index){
                const storyId = this.$route.params.id
                const id = this.employees[index]
                return http
                .post(`/api/employee/${id}/stories/${storyId}`)
                .then( response => {
                    console.log(response.data)
                    console.log('article envoyé')
                }

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
    padding: 0 10px
    
}

form input[placeholder]{
    color: #eee
}

datalist option[value]{
    font-style: inherit;
    color: #999;
    font-size: 1rem
}






</style>