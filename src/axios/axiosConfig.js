import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.raudratechnologies.com'
})

export default axiosInstance;