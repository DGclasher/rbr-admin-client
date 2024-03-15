import React, { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import JobCard from '../Components/JobCard';
import useGetJobs from '../hooks/useGetJobs';
import CircularProgress from '@mui/material/CircularProgress';
import { GrPowerReset } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import WhyJoin from '../Components/WhyJoin';
import { PiSuitcaseSimpleBold } from "react-icons/pi";


const Careers = () => {
  const { data: jobs, isLoading, isError } = useGetJobs();
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('');
  const [page, setPage] = useState(0);
  // const [n] = useState(4); // Number of items per page

  const [type, setType] = useState('Full Time');

  const typeOptions = ['Full Time',  'Internship'];

  useEffect(() => {
    if (jobs) {
    
      setFilterData(jobs);
    }
  }, [jobs]);

  const filterJobs = () => {
    if (jobs) {
      const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        job.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        job.type.toLowerCase().includes(searchType.toLowerCase())
      );
      setFilterData(filteredJobs);
      // setPage(0); 
      // setFilterData(filteredJobs.slice(0, n));
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSearchLocation('');
    setSearchType('');
    // setPage(0); // Reset page number when resetting filters
    setFilterData(jobs);
  };

  const handleApply = (_id) => {
    console.log('Applying for job with ID:', _id);
    window.open(`/job/${_id}`, '_blank');
  };
  
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected);
  };

  return (
    <div className='font-main flex flex-col relative w-full h-full items-center overflow-x-hidden mt-20'>
      {/* Banner section */}
      <div className='bg-gray-200 flex relative w-full h-72 banner text-center overflow-x-hidden'>
        <img src="/career.jpg" className='object-cover h-72 w-full filter brightness-50 saturate-150   z-0' alt="" />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
          <p className='text-2xl md:text-3xl lg:text-4xl w-full font-semibold'>Become part of our team!</p>
          <p className='text-xl hidden md:block'>Browse through our careers to be a part of Raudra Technologies</p>
        </div>
      </div>

      {/* Job openings section */}
      <div className='w-full  py-8 px-1 flex flex-col justify-center items-center'>
        <p className='text-2xl font-semibold py-8 flex items-center gap-4'><PiSuitcaseSimpleBold/>Open Job Positions</p>
        {/* Search form */}
        <div className="flex flex-col px-4 md:flex-row justify-center  pt-8 pb-4  w-full md:w-1/2 gap-4">
          
          <div className='flex flex-col md:flex-row items-center gap-4 md:gap-0'>
          <input
            type="text"
            placeholder="Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border shadow-lg border-gray-400 rounded-md w-full md:w-1/3 md:rounded-l-full"
          />
            <input
              type="text"
              placeholder="Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="p-2 border shadow-lg border-gray-400 w-full md:w-1/3 md:rounded-none rounded-md  "
            />
            <select name="" id="" value={searchType} className='p-2.5 shadow-lg w-full md:w-1/3 border border-gray-400 md:rounded-none rounded-md' onChange={(e)=>setSearchType(e.target.value)}>
              <option value="select type" className='text-gray-500 '>select type</option>
              {
                typeOptions.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))
              }
            </select>
            <button onClick={filterJobs} className="bg-blue-500 shadow-lg hover:bg-blue-700 text-white text-center px-4 py-2 md:rounded-r-full rounded-lg flex items-center justify-center gap-2"><p>Search</p> <IoSearch/></button>

          </div>
          

        </div>
        <div className='flex items-center pb-16 gap-4'>
          <button onClick={resetFilters} className="bg-gray-500 hover:bg-gray-600 text-white  px-4 py-2 rounded-md flex items-center justify-center gap-2">Reset  <GrPowerReset/></button>
          </div>
        {/* Job data table */}
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <p>Error fetching data</p>
        ) : filterData.length > 0 ? (
          <div className='w-full md:w-1/2  px-2 '>
            {filterData.map((job) => (
              <JobCard key={job._id} title={job.title} openings={job.openings} location={job.location} date={job.postedOn} type={job.type} apply={() => handleApply(job._id)} />
            ))}
          </div>
        ) : (
          <p className="text-lg bg-neutral-200 p-4 rounded">No matching positions found.</p>
        )}
        {/* Pagination */}
        {/* <ReactPaginate
          pageCount={filterData ? Math.ceil(filterData.length / n): 0} // Adjust as needed
          pageRangeDisplayed={3} // Adjust as needed
          marginPagesDisplayed={1} // Adjust as needed
          activeClassName={"Pg_active"}
                pageClassName={"page-item"}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          previousLabel={<IconContext.Provider value={{ size: "1.5em" }}><AiFillLeftCircle /></IconContext.Provider>}
          nextLabel={<IconContext.Provider value={{ size: "1.5em" }}><AiFillRightCircle /></IconContext.Provider>}
          breakClassName="break-me"
          
        /> */}
      </div>

      <WhyJoin/>

    </div>
  );
}

export default Careers;
