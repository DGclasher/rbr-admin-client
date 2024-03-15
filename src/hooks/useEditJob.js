import { useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import axiosInstance from '../axios/axiosConfig';

const useEditJob = (job) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const editJob = async (job) => {
        setIsLoading(true);
        setError(null);
        try {
            const cookies = new Cookies();
            const token = cookies.get('token');
            console.log(job);
            const response = await axiosInstance.patch(`/admin/job/${job._id}`, job, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error('Error editing job: ' + error.message);
            setError(error);
            throw new Error('Error editing job: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        editJob,
        isLoading,
        error
    };
};

export default useEditJob;
