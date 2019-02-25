import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/",
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

function auth (e) {
    return {
        headers: {
            "Authorization": e.uid + ":" + e.token
        }
    }
}

export default {
    login(e) {
        return api.post('/login', e);
    },
    getUserInfo(e) {
        return api.get('/profile', auth(e));
    }
}