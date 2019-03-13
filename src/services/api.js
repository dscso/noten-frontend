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
    getCourseData(courseid) { // fetches students of certain course
        return api.get('/courses/' + courseid + '/students')
    },
    getGrades(cid, uid) {
        return api.get('/courses/' + cid + '/students/' + uid + '/marks')
    }
}