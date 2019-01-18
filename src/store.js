import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
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
		// do login via actions (save tokens etc)
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
