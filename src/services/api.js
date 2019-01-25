import axios from 'axios'

// todo

export default() => {
    return axios.create({
        baseURL: "http://localhost:5000/",
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}