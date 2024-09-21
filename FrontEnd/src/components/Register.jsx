import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLock } from "react-icons/ai";
import Navbar from "./Navbar";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const { email, password, confirmPassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      setIsOtpSent(true); // Ensure this runs correctly after successful registration
      console.log('OTP sent:', isOtpSent); // Check if it's changing to true
      alert(response.data.message); // Confirm OTP was triggered
    } catch (error) {
      console.error("Error registering user:", error.response || error.message);
      setErrorMessage(error.response?.data.message || "An error occurred. Please try again.");
    }
  };
  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send OTP verification request
      const response = await axios.post("http://localhost:5000/api/verify-otp", { phone: formData.phone, otp });
      alert(response.data.message); // If OTP is correct, show success message
    } catch (error) {
      console.error("Error verifying OTP:", error.response || error.message);
      setErrorMessage(error.response?.data.message || "OTP verification failed.");
    }
  };
    

    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center md:items-baseline bg-white p-4">
          <div className="bg-zinc-100 p-6 md:p-8 rounded-lg shadow-md max-w-xs md:max-w-md w-full -mt-64 md:mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isOtpSent ? "Enter OTP" : "Register / பதிவு"}
          </h2>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          {isOtpSent ? (
            // OTP Verification Form
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="otp">
                  OTP
                </label>
                <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md px-3 py-2 focus-within:border-green-500">
                  <input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="appearance-none w-full bg-transparent outline-none border-none focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#089B7D] text-white py-2 rounded-md shadow-md hover:bg-[#089B7D] hover:opacity-80 hover:scale-95 focus:outline-none"
              >
                Verify OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
                  Name
                </label>
                <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md px-3 py-2 focus-within:border-green-500">
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none w-full bg-transparent outline-none border-none focus:outline-none"
                  />
                  <span className="text-gray-500 ml-2">
                    <AiOutlineUser />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md px-3 py-2 focus-within:border-green-500">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none w-full bg-transparent outline-none border-none focus:outline-none"
                  />
                  <span className="text-gray-500 ml-2">
                    <AiOutlineMail />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md px-3 py-2 focus-within:border-green-500">
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none w-full bg-transparent outline-none border-none focus:outline-none"
                  />
                  <span className="text-gray-500 ml-2">
                    <AiOutlinePhone />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md px-3 py-2 focus-within:border-green-500">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none w-full bg-transparent outline-none border-none focus:outline-none"
                  />
                  <span className="text-gray-500 ml-2">
                    <AiOutlineLock />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md px-3 py-2 focus-within:border-green-500">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none w-full bg-transparent outline-none border-none focus:outline-none"
                  />
                  <span className="text-gray-500 ml-2">
                    <AiOutlineLock />
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#089B7D] opacity-100 text-white py-2 rounded-md shadow-md hover:bg-[#089B7D] hover:opacity-80 hover:scale-95 focus:outline-none"
              >
                <span className="flex items-center justify-center">
                  <AiOutlineUser className="mr-2" /> Register
                </span>
              </button>validateForm
            </form>
          )}

            <p className="text-center mt-4 text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-[#089B7D] font-semibold">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  export default Register;
