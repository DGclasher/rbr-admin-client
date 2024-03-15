import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import axiosInstance from '../axios/axiosConfig';

const useCreateJob = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createJob = (async (formData) => {
        setIsLoading(true);
        setError(null);
        const cookies = new Cookies();
        const token = cookies.get('token');

        try {
            const response = await axiosInstance.post('/admin/job', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error('Error creating job: ' + error.message);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    );

    return {
        createJob,
        isLoading,
        error
    };
};

export default useCreateJob;
