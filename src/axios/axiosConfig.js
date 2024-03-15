import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://rbrcareers-seven.vercel.app'
})

export default axiosInstance;