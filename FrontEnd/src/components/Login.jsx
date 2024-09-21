import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import Navbar from "./Navbar";

function Login() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center md:items-baseline bg-white p-4">
        <div className="bg-zinc-100 p-6 md:p-8 rounded-lg shadow-md max-w-xs md:max-w-sm w-full -mt-64 md:mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login / உள்நுழைவு
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
              Name
            </label>
            <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md px-3 py-2 focus-within:border-green-500">
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="appearance-none w-full bg-transparent outline-none border-none focus:outline-none"
              />
              <span className="text-gray-500 ml-2">
                <CiUser />
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md px-3 py-2 focus-within:border-green-500">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="appearance-none w-full bg-transparent outline-none border-none focus:outline-none"
              />
              <span className="text-gray-500 ml-2">
                <BsFillLockFill />
              </span>
            </div>
          </div>

          <button className="w-full bg-[#089B7D] opacity-100 text-white py-2 rounded-md shadow-md hover:bg-[#089B7D] hover:opacity-80 hover:scale-95  focus:outline-none">
            <span className="flex items-center justify-center">
              <AiOutlineLogin className="mr-2" /> Login
            </span>
          </button>

          <p className="text-center mt-4 text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-[#089B7D] font-semibold">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
