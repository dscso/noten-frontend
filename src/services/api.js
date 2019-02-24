import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/",
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    login(e) {
        return api.post('/login', e);
    },
    getUserInfo(e) {
        return api.get('/users/' + e.uid, {
            headers: {
                "Authorization": e.uid + ":" + e.token
            }
        });
    }
}