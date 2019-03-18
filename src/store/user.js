import Vue from 'vue'
import api from '../services/api'

const uid = localStorage.getItem('uid')
const token = localStorage.getItem('token')

export default {
	state: {
		uid: uid || null,
		token: token || null,
		firstname: null,
		surname: null,
		type: null
	},
	actions: {
		login({commit, state}, args) {
			return new Promise(function (resolve, reject) {
				api.login(args).then(function (response) {
					commit("AUTH", response.data) // save user info to state
					api.passToken(state.token) // passing new token to api
					localStorage.setItem('uid', state.uid) // setting cookies
					localStorage.setItem('token', state.token)
					resolve(response);
				}, function (error) {
					reject(error);
				})
			})
		},
		authenticate({commit, state}) { // this function gets called if page gets reloaded. It checks if the token still is valid
			if (state.uid == null) {
				commit('UNAUTH')
				return
			}
			api.passToken(state.token) // pass token to api before first api call
			api.getUserInfo().then(function (resp) {
				console.log("loaded data of user...")
				commit("AUTH", resp.data)
			}, function (error) {
				console.log("Token is not valid any more...")
				commit('UNAUTH')
				localStorage.removeItem('uid')
				localStorage.removeItem('token')
			})
		},
		signOut({commit, state}) {
			// TODO: Unvalidate token
			commit('UNAUTH')
			localStorage.removeItem('uid')
			localStorage.removeItem('token')
		}
	},

	mutations: {
		AUTH(state, data) {
			state.uid = data.uid
			state.firstname = data.firstname
			state.surname = data.surname
			state.type = data.type
			state.token = state.token || data.token
		},
		UNAUTH(state) {
			state.uid = null
			state.firstname = null
			state.surname = null
			state.type = null
			state.token = null
			api.passToken(null)
		}
	},

	getters: {
		isAuthenticated: function (state) {
			return (state.uid != null);
		},
		uid: function (state) {
			return state.uid;
		},
		name: function (state) {
			return state.firstname + " " + state.surname
		},
		isTeacher: function (state) {
			return (state.type === 3)
		},
		isStudent: function (state) {
			return (state.type === 1)
		},
		type: function (state) {
			return state.type
		}
	}
}
