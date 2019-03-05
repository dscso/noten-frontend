import axios from 'axios'

const api = axios.create({
    baseURL: "http://10.16.104.17:5000/", // TODO: make configurable
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    passToken(uid, token) { // used to set Authorization header
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
    }
}