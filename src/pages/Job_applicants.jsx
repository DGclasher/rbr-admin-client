import React from 'react';
import { useParams } from 'react-router-dom';
import DataTable from '../Components/DataTable';
import useGetJobApplications from '../hooks/useGetJobApplications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CircularProgress from '@mui/material/CircularProgress';
import useDeleteApplicant from '../hooks/useDeleteApplicant';
import { MdDelete } from "react-icons/md";
import Cookies from 'universal-cookie';
import { BiSolidSad } from "react-icons/bi";
import { RiFileExcel2Line } from "react-icons/ri";
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axios/axiosConfig';

const Job_Applicants = () => {
  const { id } = useParams();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const { data: jobApplications, isLoading, isError, error, refetch } = useGetJobApplications(id);
  const deleteApplicant = useDeleteApplicant();

  const handleExport = async () => {
    try {
      const res = await axiosInstance.get(`/admin/export/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob',
      });

      const blob = new Blob([res.data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'job_applications.csv';
      link.click();
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this application?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await deleteApplicant(id);
            refetch();
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  const columns = [
    { field: 'applicantName', headerName: 'Name', flex: 1 },
    { field: 'semester', headerName: 'Semester', flex: 1 },
    {
      field: 'college',
      headerName: 'College',
      flex: 1,
      valueGetter: (params) => {
        const lastQualification = params.row.qualifications[params.row.qualifications.length - 1];
        if (lastQualification) {
          return lastQualification.college || '';
        } else {
          return '';
        }
      },
    },
    {
      field: 'university',
      headerName: 'University',
      flex: 1,
      valueGetter: (params) => {
        const lastQualification = params.row.qualifications[params.row.qualifications.length - 1];
        if (lastQualification) {
          return lastQualification.university || '';
        } else {
          return '';
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-4 justify-around items-center">
          <button className='bg-lime-500 text-white rounded px-2 py-1' onClick={() => handleLearnMore(params.row._id)}>Learn More</button>
          <button className='text-rose-500 text-2xl' onClick={() => handleDelete(params.row._id)}><MdDelete /></button>
        </div>
      ),
    },

  ];

  const handleLearnMore = (id) => {
    console.log('Learning more about applicant with ID:', id);
    window.open(`/admin/applicant/${id}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='py-12 font-main mt-20 min-h-screen'>
      <div className='w-full py-8 px-1 flex flex-col justify-center items-center'>
        {jobApplications.length > 0 && (
          <div className='flex items-center gap-4'>
            <button onClick={handleExport} className='bg-lime-500 rounded px-4 py-2 flex items-center gap-2 text-white'>
              Export <RiFileExcel2Line />
            </button>
          </div>
        )}
        <p className='text-2xl font-semibold py-8'>List of Applicants</p>
        {jobApplications.length === 0 ? (
          <p className='flex items-center gap-4 p-2 rounded bg-rose-300 border border-rose-500'>No job applications submitted yet <BiSolidSad /></p>
        ) : (
          <div className='w-full px-4 flex flex-col items-center justify-center'>
            <p className='py-4 font-medium text-xl'>Number of Applicants: {jobApplications.length}</p>
            <DataTable columns={columns} rows={jobApplications} />
            <div className='w-full sm:flex md:hidden lg:hidden'>
              {jobApplications.map((applicant) => {
                const lastQualification = applicant.qualifications[applicant.qualifications.length - 1];
                return (
                  <div key={applicant._id} className='shadow-md p-4 rounded my-4 w-full'>
                    <p>Name: {applicant.applicantName}</p>
                    <p>Semester: {applicant.semester}</p>
                    <p>College: {lastQualification.college}</p>
                    <p>University: {lastQualification.university}</p>
                    <button onClick={() => handleLearnMore(applicant._id)} className='bg-lime-500 rounded px-2 py-1'>Learn More</button>
                    <button onClick={() => handleDelete(applicant._id)} className='bg-red-500 rounded px-2 py-1 mx-4'>Delete</button>
                  </div>
                );
              })}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Job_Applicants;
