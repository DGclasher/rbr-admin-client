import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import axiosInstance from '../axios/axiosConfig';
const useGetJobApplications = (jobId) => {
    const cookies = new Cookies();
    const token = cookies.get('token');
  const getJobApplications = async () => {
    const response = await axiosInstance.get(`/admin/job/${jobId}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
        
    });
    const jobApplications = response.data.data;
    console.log('jobApplications:', jobApplications);
    return jobApplications;
  };

  return useQuery(['jobApplications', jobId], getJobApplications, {
    onError: (error) => {
      console.error('Error fetching job applications:', error);
    }
  });
};

export default useGetJobApplications;
