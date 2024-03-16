import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Job_Applicants from './pages/Job_applicants';
import Login from './pages/Login';
import Job from './pages/Job';
import Navbar from './Components/Navbar';
import CreateJobForm from './pages/CreateJobForm';
import EditJobForm from './pages/EditJobForm';
import Applicant from './pages/Applicant';
import Dashboard from './pages/Dashboard';
import { useAuthContext } from './hooks/useAuthContext';
import NotFound from './pages/NotFound';
import { CircularProgress } from '@mui/material';

function App() {
  const { user, isLoading } = useAuthContext();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Set authChecked to true once user context is fetched
    setAuthChecked(true);
  }, [user]);

  // Show loading spinner or content based on whether user context is being fetched
  if (!authChecked || isLoading) {
    return( 
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
      <CircularProgress />
    </div>)
    ;
  }

  // If user context is fetched, render the routes based on user authentication
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {!user &&  
          <Route path="/" element={<Login />} /> 
          }

          {/* <Route path="/admin_login" element={<Login />} /> */}
          <Route path="/job/:id" element={<Job />} />
         
          {/* Conditionally render admin routes if user exists */}
          {user ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin/create_job" element={<CreateJobForm />} />
              <Route path="/admin/edit_job" element={<EditJobForm />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/applicant/:id" element={<Applicant />} />
              <Route path="/admin/job_applicants/:id" element={<Job_Applicants />} />
            </>
          ) : (
            // Redirect to login if user doesn't exist
            <Route path="*" element={<Navigate to="/" />} />
          )}

          {/* Route for handling 404 or unauthorized access */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
