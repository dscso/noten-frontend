import axios from 'axios'

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/", // TODO: make configurable
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    passToken(token) { // used to set Authorization header
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    login(e) { // gets triggered if you click "login" on loginpage
        return api.post('/login', e);
    },
    getUserInfo() { // gets triggered on every page reload
        return api.get('/profile');
    },
    getTeacherCourses(teacherid) { // fetches all courses that a teacher teaches
        return api.get('/teachers/' + teacherid + '/courses')
    },
    getStudentCourses(uid) {
        return api.get('/students/' + uid + '/marks')
    },
    getCourseData(courseid) { // fetches students of certain course
        return api.get('/courses/' + courseid + '/students')
    },
    getTeacherMarks(cid) {// get marks for a course
        return api.get('/courses/' + cid + '/marks')
    },
    setMark(params) { // set mark
        return api.post('/courses/' + params.courseid + '/students/' + params.studentid + '/marks/' + params.markmetaid, {mark: params.mark})
    },
    newMarkMeta(params) {
        return api.post('/courses/' + params.courseid + '/markmetas', {name: params.name, valence:params.valance})
    }
}