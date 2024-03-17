import React, { useState } from "react";
import useCreateJob from "../hooks/useCreateJob";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { FaPaperPlane } from "react-icons/fa";
import ScrollToTop from "../utils/ScrollToTop";

const CreateJobForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [stipend, setStipend] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full Time");
  const { createJob, isLoading, error } = useCreateJob();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData;
    if (stipend === "" || stipend === 0) {
      formData = {
        title,
        description: { responsibilities, requirements },
        location,
        type,
      };
    } else {
      formData = {
        title,
        description: { responsibilities, requirements, stipend },
        location,
        type,
      };
    }
    console.log(formData);

    await createJob(formData);
    console.log(error);
    if (!error) {
      setTitle("");
      setResponsibilities("");
      setRequirements("");
      setStipend("");
      setLocation("");
      setType("");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="max-w-md mt-20 mx-auto font-main my-8  px-4">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Create a new job
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex border-t-4 border-blue-500 p-4 rounded-md shadow-xl shadow-neutral-400 flex-col items-center justify-center w-full  "
      >
        <div className="w-full py-8">
          <div>
            <div>
              <label
                htmlFor="title"
                className="block text-lg font-semibold mt-2"
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
                className="block text-lg font-semibold mt-2"
              >
                Responsibilities{" "}
                <span className="text-sm">
                  (add every responsibility in a new line)
                </span>
              </label>
              <textarea
                id="responsibilities"
                placeholder="Build the data models \n build the frontend"
                className="w-full border border-gray-500 rounded px-3 py-2 h-40 "
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="requirements"
                className="block text-lg font-semibold mt-2"
              >
                Requirements{" "}
                <span className="text-sm">
                  (add every requirement in a new line)
                </span>
              </label>
              <textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="6yrs of Experience in Node Js \n 6+ years of experience in React js"
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
                className="block text-lg font-semibold mt-2"
              >
                Stipend
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
                className="block text-lg font-semibold mt-2"
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
                className="block text-lg font-semibold mt-2"
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
          Create Job
          {isLoading ? <CircularProgress size={20} /> : <FaPaperPlane />}
        </button>
      </form>
      <ScrollToTop />
    </div>
  );
};

export default CreateJobForm;
