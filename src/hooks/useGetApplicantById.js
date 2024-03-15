import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import axiosInstance from '../axios/axiosConfig';
const useGetApplicantById = (applicantId) => {
    const cookies = new Cookies();
    const token = cookies.get('token');
  const getApplicantById = async () => {
    const response = await axiosInstance.get(`/admin/applicant/${applicantId}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const applicantData = response.data.data;

    console.log(applicantData);
    return applicantData;
  };

  return useQuery(['applicant', applicantId], getApplicantById, {
    onError: (error) => {
      console.error('Error fetching applicant:', error);
    }
  });
};

export default useGetApplicantById;
