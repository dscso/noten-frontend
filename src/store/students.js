import Vue from 'vue'
import api from '../services/api'

export default {
	state: {
		data: {},
		coursesDownloaded: false
	},
	actions: {
		fetchStudent: function ({commit, getters}) {
			return new Promise(function (resolve, reject) {
				if (!getters.coursesDownloaded) { // prevent reloading
					api.getStudentCourses(getters.uid).then(function (resp) {
						console.log("loaded Student data...")
						commit('PUSH_STUDENT', resp.data)
						resolve(resp)
					}, function (error) {
						console.log("error")
						reject(error)
					})
				}
			});
		}
	},
	mutations: {
		PUSH_STUDENT(state, data) {
			state.data = data
			state.coursesDownloaded = true
		}
	},
	getters: {
		studentCoursesDownloaded: (state) => {
			return state.coursesDownloaded
		},
		getStudentCourses: (state) => {
			return state.data.courses || {}
		},
		getStudentCourse: (state) => id => {
			var courses = state.data.courses || {}
			for (let index = 0; index < courses.length; ++index) {
				if (courses[index].cid == id) {
					return courses[index]
				}
			}
			return {}
		},
		getStudentMarkMeta: (state) => id => {
			var metas = state.data.metas || {}
			return metas[id] || {}
		},
		getStudentMarks: (state)  => {
			return state.data.marks || {}
		}
	}
}
