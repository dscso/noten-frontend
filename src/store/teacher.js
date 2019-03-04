import Vue from 'vue'
import api from '../services/api'

export default {
	state: {
		courses: [],
		coursedata: {}
	},
	actions: {
		fetchCourses: function ({commit, getters}) {
			if (!getters.coursesDownloaded) { // prevent reloading
				api.getTeacherCourses(getters.uid).then(function (resp) {
					console.log("loaded courses list...")
					commit('PUSH_COURSES', resp.data)
				}, function (error) {
					console.log("error")
				})
			}
		},
		fetchCourseData: function ({commit}, cid) { // fetches the courses from vuex
			api.getCourseData(cid).then(function (resp) {
				console.log("loaded data of course '"+cid+"'...")
				console.log(resp.data)
				commit({
					type:'PUSH_COURSE_DATA',
					cid: cid,
					data: resp.data
				})
			}, function (error) {
				console.log("error")
			})
		}
	},
	mutations: {
		PUSH_COURSES(state, courses) {
			state.courses = courses
		},
		PUSH_COURSE_DATA(state, payload) {
			state.coursedata[payload.cid] = payload.data
		}
	},
	getters: {
		getCourses: function (state) {
			return state.courses
		},
		coursesDownloaded: function (state) {
			return !(state.courses.length == 0)
		},
		getStudents: (state) => cid => {
			return state.coursedata[cid]
		}
	}
}
