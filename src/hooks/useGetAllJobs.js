import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import axiosInstance from '../axios/axiosConfig';
const fetchJobs = async () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    try {
        const response = await axiosInstance.get('/admin/jobs', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch jobs');
    }
};


const useJobs = () => {
    return useQuery('jobs', fetchJobs);
};

export default useJobs;
