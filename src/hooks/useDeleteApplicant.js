import { useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import axiosInstance from '../axios/axiosConfig';

const useDeleteApplicant = () => {
    const deleteApplicantMutation = useMutation(async (id) => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        await axiosInstance.delete(`/admin/applicant/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    });

    const deleteApplicant = async (id) => {
        try {
            await deleteApplicantMutation.mutateAsync(id);
        } catch (error) {
            console.error('Error deleting applicant:', error);
        }
    };

    return deleteApplicant;
};

export default useDeleteApplicant;
