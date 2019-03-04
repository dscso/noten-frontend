import Vue from 'vue'
import api from '../services/api'

export default {
	state: {
		courses: []
	},
	actions: {
		fetchCourses: function ({state, commit, getters}) {
			if (!getters.coursesDownloaded) { // prevent reloading
				api.getTeacherCourses(getters.uid).then(function (resp) {
					console.log("loaded course data...")
					commit('PUSH_COURSES', resp.data)
				}, function (error) {
					console.log("error")
				})
			}
		}
	},
	mutations: {
		PUSH_COURSES(state, courses) {
			state.courses = courses
		}
	},
	getters: {
		getCourses: (state) => {
			return state.courses
		},
		coursesDownloaded: function (state) {
			return !(state.courses.length == 0)
		}
	}
}
