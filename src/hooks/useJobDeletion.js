import { useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import axiosInstance from '../axios/axiosConfig';
const useDeleteJob = () => {
    const deleteJobMutation = useMutation(async (id) => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        await axiosInstance.delete(`/admin/job/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    });

    const deleteJob = async (id) => {
        try {
            await deleteJobMutation.mutateAsync(id);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    return deleteJob;
};

export default useDeleteJob;
