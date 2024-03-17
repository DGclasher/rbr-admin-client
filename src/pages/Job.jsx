import React from "react";
import { useParams } from "react-router-dom";
import useGetJobById from "../hooks/useGetJobbyId";
import { CircularProgress } from "@mui/material";
import { MdArrowOutward } from "react-icons/md";
import ScrollToTop from "../utils/ScrollToTop";

const Job = () => {
  const { id } = useParams();
  const { data: job, isLoading, isError } = useGetJobById(id);

  const handleApply = (id) => {
    console.log("Applying for job with ID:", id);
    window.open(`/apply/${id}`, "_blank");
  };

  return (
    <div className="w-full mt-20 px-4 min-h-screen font-main py-16 md:w-[90%] lg:w-[80%] mx-auto">
      <h1 className="text-3xl font-semibold mt-4">Job Details</h1>
      {isLoading ? (
        <p className="w-full h-screen  justify-center flex items-center">
          <CircularProgress />
        </p>
      ) : isError ? (
        <p className="text-rose-500 bg-rose-100 p-2 rounded">
          Error fetching job
        </p>
      ) : (
        <div className="py-12 ">
          <div className="border-l-2 space-y-4 border-blue-500 p-4 bg-zinc-100">
            <p className="text-2xl font-semibold text-blue-500">{job.title}</p>
            <p className="font-semibold">Job Requisition ID : {job._id}</p>
            <p className="font-semibold">Type: {job.type}</p>
            <button
              onClick={() => handleApply(id)}
              className="bg-blue-600 my-8 flex items-center gap-2 hover:bg-blue-700 text-white font-bold p-2 rounded"
            >
              Apply Now <MdArrowOutward />
            </button>
          </div>
          <div className="pb-2 pt-4">
            <h2 className="text-xl font-semibold">Responsibilities</h2>
            {job.description.responsibilities
              .split("\n")
              .map((responsibility, index) => (
                <li key={index} className="font-medium">
                  {responsibility.trim()}
                </li>
              ))}
          </div>
          <div className="py-2">
            <h2 className="text-xl font-semibold">Requirements</h2>
            <ul className="list-disc pl-6">
              {job.description.requirements
                .split("\n")
                .map((requirement, index) => (
                  <li key={index} className="font-medium">
                    {requirement.trim()}
                  </li>
                ))}
            </ul>
          </div>
          <div className="py-2">
            {job.description.stipend ? (
              <div>
                <h2 className="text-xl font-semibold">Stipend</h2>
                <p className="text-lg ">
                  {" "}
                  {job.description.stipend}/- per month
                </p>
              </div>
            ) : null}
          </div>

          <div className="py-2">
            <h2 className="text-xl font-semibold">Location</h2>
            <p className="text-lg "> {job.location}</p>
          </div>

          <p className="bg-zinc-300 py-1 px-2 rounded w-44 text-sm">
            Posted On: {new Date(job.postedOn).toLocaleDateString()}
          </p>
          <button
            onClick={() => handleApply(id)}
            className="bg-blue-600 my-8 flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
          >
            Apply Now <MdArrowOutward />
          </button>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default Job;
