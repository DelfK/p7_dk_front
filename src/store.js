import Vue from 'vue'
import Vuex from 'vuex'
import http from './services'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user: null,
        errMsg: null,
        showMenu: false,
        showValidSignIn: false,
        moderator: null,
        deletedAccountMsg: false
        
    },
    mutations:{
        SET_USER_DATA (state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            
        },

        SHOW_HIDE_MENU (state){
            if(state.showMenu === false){
                state.showMenu = true
            } else {
                state.showMenu = false
            }  
        },

        CLEAR_USER_DATA(state) {
            state.user = null
            localStorage.removeItem('user')
            state.showMenu = false
            
        }
    },
    actions: {
        login ( { commit }, credentials ) {
            return http
            .post('/api/employee/login', credentials)
            .then( ( {data} ) => {
                commit('SET_USER_DATA', data)
                this.state.errMsg = null
                return data.employeeId
                
                    
            })
            .then( (id) => {
                return http
                .get(`api/employee/${id}`)
                .then( (response) => {
                    const role = response.data.role
                    if( role === "moderator"){
                        this.state.moderator = true
                    } else {
                        this.state.moderator = false
                    }
                    
                    
                })

            })
            .catch((error) => {
                this.state.errMsg = error.response.data.error
                this.$router.push({ name: 'login' })
            })
            
        },

        logout ({ commit }) {
            commit('CLEAR_USER_DATA')
        }


    },
    // when page refreshed, prevent the user from being disconnected
    plugins: [createPersistedState()]
});