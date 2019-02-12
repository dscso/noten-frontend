import Vue from 'vue'
import api from '../services/api'

const user = JSON.parse(localStorage.getItem('user'));

export default {
	state: {
		authenticated: localStorage.getItem('user') || false,
		client_id: null,
		token: null
	},
	actions: {
		login(state, args) {
			localStorage.setItem('user', true)
			return new Promise(function (resolve, reject) {
				api().post("/login", {
					mail: args.mail,	
					password: args.password
				}).then(function (response) {
					console.log(response)
					resolve(response);
				}, function (error) {
					reject(error);
				})
			})
		}
	},

	mutations: {
		CHANGE_CLIENT_ID(state, to) {
			state.client_id = to;
		},
		CHANGE_TOKEN(state, to) {
			state.token = to;
		},
		CHANGE_AUTHENTICATED(state, to) {
			state.authenticated = to;
		}
	},

	getters: {

	}
}
