import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { FaPaperPlane } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import useEditJob from "../hooks/useEditJob";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

const EditJobForm = (props) => {
  const navigate = useNavigate();
  const { editJob, isLoading, error } = useEditJob();
  const locationo = useLocation();
  const { job } = locationo.state;
  console.log(job);

  const [_id, setId] = useState(job._id || "");
  const [title, setTitle] = useState(job.title || "");
  const [responsibilities, setResponsibilities] = useState(
    job.description?.responsibilities || ""
  );
  const [requirements, setRequirements] = useState(
    job.description?.requirements || ""
  );
  const [stipend, setStipend] = useState(
    job.description?.salary || job.description?.stipend || ""
  );
  const [location, setLocation] = useState(job.location || "");
  const [openings, setOpenings] = useState(job.openings || 0);
  const [type, setType] = useState(job.type || "Full Time");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedJobData;
    if (stipend === "" || stipend === 0) {
      updatedJobData = {
        _id,
        title,
        description: { responsibilities, requirements },
        location,
        type,
      };
    } else {
      updatedJobData = {
        _id,
        title,
        description: { responsibilities, requirements, stipend },
        location,
        type,
      };
    }

    try {
      await editJob(updatedJobData);
      if (!error) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto font-main my-8  px-4">
      <h1 className="text-3xl font-semibold mb-4 text-center">Edit job</h1>
      <form
        onSubmit={handleSubmit}
        className="flex border-t-4 border-blue-500 p-4 rounded-md shadow-xl shadow-neutral-400 flex-col items-center justify-center w-full  "
      >
        <div className="w-full py-8">
          <div>
            <div>
              <label
                htmlFor="title"
                className="block text-lg mt-2 font-semibold"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-500 rounded px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="responsibilities"
                className="block text-lg mt-2 font-semibold"
              >
                Responsibilities{" "}
                <span className="text-sm">
                  (add commas after each responsibility)
                </span>
              </label>
              <textarea
                id="responsibilities"
                className="w-full border border-gray-500 rounded px-3 py-2 h-40 "
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="requirements"
                className="block text-lg mt-2 font-semibold"
              >
                Requirements
                <span className="text-sm">
                  (add commas after each requirement)
                </span>
              </label>
              <textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                required
                className="w-full border border-gray-500 h-40  rounded px-3 py-2"
              ></textarea>
            </div>
          </div>
          {/*----------------- */}
          <div className="md:flex gap-4">
            <div>
              <label
                htmlFor="salary"
                className="block text-lg mt-2 font-semibold"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full border border-gray-500 rounded px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-lg mt-2 font-semibold"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full border border-gray-500 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="md:flex gap-4 items-center">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="type"
                className="block text-lg mt-2 font-semibold"
              >
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-500 rounded px-3 py-2"
              >
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold gap-2 py-2 px-4 rounded"
        >
          Edit Job
          {isLoading ? <CircularProgress size={20} /> : <FaPaperPlane />}
        </button>
      </form>
      <ScrollToTop />
    </div>
  );
};

export default EditJobForm;
