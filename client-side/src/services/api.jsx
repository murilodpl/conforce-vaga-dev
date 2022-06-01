import axios from "axios"

const api = axios.create({
    baseURL: 'https://localhost:7146/api/',
    validateStatus: false,
})

export default api;