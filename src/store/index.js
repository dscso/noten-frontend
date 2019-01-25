import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production', // throws exception if you change stage externally
	modules: {
		user
	},
	state: {
		navbar: false,
		login: false
	},
	mutations: {
		toggle_navbar(state, to) {
			state.navbar = to || !state.navbar;
		},
		toggle_login(state) {
			state.login = !state.login;
		}
	},
	actions: {
		tmp() {console.log("tpm")}
	},
	getters: {
		navbar(state) {
			return state.navbar;
		},
		login(state) {
			return state.login;
		}
	}
})
