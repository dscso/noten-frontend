import Vue from 'vue'
import api from '../services/api'

export default {
	state: {
		courses: [],
		students: {},
		marks: {}
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
		},
		fetchMarks: function ({commit}, cid) {
			new Promise(function (resolve, reject) {
				api.getTeacherMarks(cid).then(function (resp) {
					console.log("loaded marks of course " + cid)
					commit({
						type:'PUSH_MARKS',
						cid: cid,
						data: resp.data
					})
					// TODO state commits
					resolve(resp)
				}, function (error) {
					console.log("error")
					reject(error)
				})
			});
		}
	},
	mutations: {
		PUSH_COURSES(state, courses) {
			state.courses = courses
		},
		PUSH_STUDENTS(state, payload) {
			Vue.set(state.students, payload.cid, payload.data) // Vue.set seems to be needed because of object manipulation
		},
		PUSH_MARKS(state, payload) {
			Vue.set(state.marks, payload.cid, payload.data)
		}
	},
	getters: {
		getCourses: function (state) {
			return state.courses
		},
		getCourse: (state) => id => {
			for (let index = 0; index < state.courses.length; ++index) {
				if (state.courses[index].cid == id) {
					return state.courses[index]
				}
			}
			return {}
		},
		coursesDownloaded: function (state) {
			return !(state.courses.length == 0)
		},
		getStudents: (state) => cid => {
			return state.students[cid]
		},
		getMarkMetas: (state) => courseid => {
			var marks = state.marks[courseid] || {}
			return marks.metas || {}
		},
		getMarks: (state) => (courseid, studentid) => {
			var tmp = state.marks[courseid] || {}
			tmp = tmp.students || {}
			return tmp[studentid] || {} // TODO: make this beautiful 
		}
	}
}
