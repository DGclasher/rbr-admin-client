import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import TextField from "@mui/material/TextField";
import { MdAccountCircle } from "react-icons/md";
import ScrollToTop from "../utils/ScrollToTop";
import { IoLogInOutline } from "react-icons/io5";

const Login = () => {
  const { login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex py-16 mt-20 min-h-screen justify-center items-center p-8 font-main">
      <div className="w-full md:w-1/2 lg:w-1/3  bg-zinc-100 rounded-md border  shadow-md">
        <form
          onSubmit={handleSubmit}
          className="p-4 flex flex-col justify-center"
        >
          <div className="text-5xl mx-auto ">
            <MdAccountCircle />
          </div>
          <h2 className="text-lg font-medium text-center pb-8">
            Welcome, login to your account{" "}
          </h2>

          <div className="mb-4">
            <TextField
              className="border border-gray-300 bg-white rounded px-4 py-2 w-full"
              type="email"
              value={email}
              label="Email"
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              className="border border-gray-300 bg-white rounded px-4 py-2 w-full"
              type="password"
              value={password}
              label="Password"
              onChange={handlePasswordChange}
            />
          </div>

          <button
            className="bg-blue-600 flex items-center gap-4 justify-center hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            type="submit"
          >
            Login <IoLogInOutline className="text-2xl" />
          </button>
        </form>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Login;
