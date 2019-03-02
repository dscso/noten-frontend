import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/",
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    passToken(uid, token) { // used to set Authorization header
        console.log(api.defaults)
        api.defaults.headers.common['Authorization'] = uid + ':' + token
        console.log(api.defaults)
    },
    login(e) { // gets triggered if you click "login" on loginpage
        return api.post('/login', e);
    },
    getUserInfo() { // gets triggered on every page reload
        return api.get('/profile');
    }
}