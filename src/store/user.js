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
					api.passToken(state.uid, state.token) // passing new token to api
					commit("AUTH", response.data)
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
			api.passToken(state.uid, state.token) // pass token to api before first api call
			api.getUserInfo().then(function (resp) {
				console.log("loaded data of user...")
				commit("AUTH", resp.data)
			}, function (error) {
				console.log("Token is not valid any more...")
				commit('UNAUTH')
			})
		},
		signOut({commit, state}) {
			// TODO: Unvalidate token
			commit('UNAUTH')
		}
	},

	mutations: {
		AUTH(state, data) {
			state.uid = data.uid
			state.firstname = data.firstname
			state.surname = data.surname
			state.type = data.type
			state.token = state.token || data.token
			localStorage.setItem('uid', state.uid)
			localStorage.setItem('token', state.token)
		},
		UNAUTH(state) {
			state.uid = null
			state.firstname = null
			state.surname = null
			state.type = null
			state.token = null
			localStorage.removeItem('uid')
			localStorage.removeItem('token')
			api.passToken(null, null)
		}
	},

	getters: {
		isAuthenticated: function (state) {
			return (state.uid != null);
		},
		name: function (state) {
			return state.firstname + " " + state.surname
		},
		isTeacher: function (state) {
			return (state.type === 3)
		},
		isStudent: function (state) {
			return (state.type === 2 || state.type === 1)
		},
		type: function (state) {
			return state.type
		}
	}
}
