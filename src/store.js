import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'
import http from './services'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user: null,
        errMsg: null,
        showMenu: false,
        count: 0
    },
    mutations:{
        SET_USER_DATA (state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            //console.log('token', userData.token)
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
                console.log('user data is', data)
                commit('SET_USER_DATA', data)
                this.state.errMsg = null
                    
            })
            .catch((error) => {
                console.log(error);
                this.state.errMsg = error.response.data.error
            })
            
        },

        logout ({ commit }) {
            commit('CLEAR_USER_DATA')
          }


    },
    plugins: [createPersistedState()]
});