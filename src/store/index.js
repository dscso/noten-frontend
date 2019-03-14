import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import teacher from './teacher'
import students from './students'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production', // throws exception if you change stage externally
	modules: {
		user,
		teacher,
		students
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
