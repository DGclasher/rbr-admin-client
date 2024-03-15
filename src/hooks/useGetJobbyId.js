import { useQuery } from 'react-query';
import axios from 'axios';
import axiosInstance from '../axios/axiosConfig';
const useGetJobById = (jobId) => {
  const getJobById = async () => {
    console.log('Fetching job with ID:', jobId)
    const response = await axiosInstance.get(`/jobs/${jobId}`);
    const jobData = response.data.data;

    console.log(jobData);
    return jobData;
  };

  return useQuery(['job', jobId], getJobById, {
    onError: (error) => {
      console.error('Error fetching job:', error);
    }
  });
};

export default useGetJobById;
