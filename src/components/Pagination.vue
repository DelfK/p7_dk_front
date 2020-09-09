<template>
    <div>
        <div class="pagesList">
            <ul>
                <li v-on:click="goToPage(page)" v-bind:key="index" v-for="(page, index) in pages"><span v-bind:class="{pageActive : page.active}">{{page.number}}</span></li>
            </ul>
        </div>

    </div>
</template>

<script>
    import http from '../services'
    export default {
        name: 'paginate',
        data() {
            return {
                pageSize: 5,
                pages: [],
                allArticles: [],
                currentPage: null,
                isActive: null
                
                
            }
             
        },
        created(){
            return http
            .get('/api/employee/stories/count')
            .then(response => {
                return response.data[0].Total 
            })
            .then( (total) => {

                const totalPages = total / this.pageSize
                for(let i = 0; i < totalPages; i++) {
                     this.pages.push({number: i+1, active: false})
                    
                }
                // make button page 1 active on page load
                this.pages[0].active = true
                 
                

            })
        },

        methods : {
            goToPage(page){
                this.currentPage = page.number
                const offset = (this.currentPage * this.pageSize) - this.pageSize
                this.$emit('changePage', offset)

                for(const onePage of this.pages){        
                    if(onePage.number == page.number){
                        onePage.active = true
                    } else {
                        onePage.active = false
                    }    
                }
                  
            }

        }
    }
</script>

<style scoped>
.pageActive {
    background-color: #FFD8D8;
    border-color: #FFD8D8
}

ul{
    list-style-type: none;
    
}

li {
    display: inline-block;
    cursor: pointer;
    margin: 0px 5px;
    
}

li span{
    display: block;
    width: 40px;
    height: 40px;
    text-align: center;
    border: 1px solid #67A59F;
    line-height: 40px;
    border-radius: 50%;
    background-color: #67A59F;
    color: #FFF
}

span:hover{
    background-color: #7cb2ac;
    border-color: #7cb2ac
}

</style>