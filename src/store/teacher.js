import Vue from 'vue'
import api from '../services/api'

export default {
	state: {
		courses: [],
		students: {}
	},
	actions: {
		fetchCourses: function ({commit, getters}) {
			new Promise(function (resolve, reject) {
				if (!getters.coursesDownloaded) { // prevent reloading
					api.getTeacherCourses(getters.uid).then(function (resp) {
						console.log("loaded courses list...")
						commit('PUSH_COURSES', resp.data)
						resolve(resp)
					}, function (error) {
						console.log("error")
						reject(error)
					})
				}
			});
		},
		fetchStudents: function ({commit}, cid) { // fetches the courses from vuex
			new Promise(function (resolve, reject) {
				api.getCourseData(cid).then(function (resp) {
					console.log("loaded " + cid + " ...")
					commit({
						type:'PUSH_STUDENTS',
						cid: cid,
						data: resp.data
					})
					resolve(resp)
				}, function (error) {
					console.log("error")
					reject(error)
				})
			})
		}
	},
	mutations: {
		PUSH_COURSES(state, courses) {
			state.courses = courses
		},
		PUSH_STUDENTS(state, payload) {
			Vue.set(state.students, payload.cid, payload.data) // Vue.set seems to be needed because of object manipulation
		}
	},
	getters: {
		getCourses: function (state) {
			return state.courses
		},
		getCourse: (state) => id => {
			if (state.courses[id] == null) {
				return {id: null, short: null}
			} else {
				return state.courses[id]
			}
		},
		coursesDownloaded: function (state) {
			return !(state.courses.length == 0)
		},
		getStudents: (state) => cid => {
			return state.students[cid]
		}
	}
}
