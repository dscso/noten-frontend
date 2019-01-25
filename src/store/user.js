import Vue from 'vue'
import api from '../services/api'

//const user = JSON.parse(localStorage.getItem('user'));

export default {
	state: {
		authenticated: false,
		client_id: null,
		token: null
	},
	actions: {
		login(state, args) {
			console.log(args.mail +"_" +args.password)
			return new Promise(function (resolve, reject) {
				console.log(this)
				api().post("/login", {
					mail: args.mail,
					password: args.password
				  }).then(function (response) {
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
