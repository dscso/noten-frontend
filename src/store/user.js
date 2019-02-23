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
					console.log(response)
					commit("AUTH", response.data)
					localStorage.setItem('uid', state.uid)
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
			console.log("auth")
			api.getUserInfo({
				uid: state.uid,
				token: state.token
			}).then(function (resp) {
				console.log(resp)
			}, function (error) {
				console.log("Token is not valid any more...")
			})
		}
	},

	mutations: {
		AUTH(state, data) {
			console.log(data)
			state.uid = data.uid
			state.firstname = data.firstname
			state.surname = data.surname
			state.type = data.type
			state.token = data.token
		},
		UNAUTH(state) {
			state.uid = null
			state.firstname = null
			state.surname = null
			state.type = null
			state.token = null
		}
	},

	getters: {

	}
}
