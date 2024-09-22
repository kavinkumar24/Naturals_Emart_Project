import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLock, AiOutlineCheck } from "react-icons/ai";
import Navbar from "./Navbar";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const { email, password, confirmpassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmpassword) {
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

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      setIsSuccess(true);
      alert(response.data.message);
    } catch (error) {
      console.error("Error registering user:", error.response || error.message);
      setErrorMessage(error.response?.data.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-white p-4">
        <div className="bg-zinc-100 p-6 rounded-lg shadow-md max-w-md w-full -mt-44 md:mt-0"> {/* Adjusted max-w */}
        {isSuccess ? (
  <div className="flex justify-center mb-4">
    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
      <AiOutlineCheck className="text-white text-3xl" />
    </div>
      <p>Registered successfully please login to continue</p>
  </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">Register / பதிவு</h2>
              {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
              {isSubmitting && (
                <div className="h-1 bg-blue-500 transition-all duration-300 mb-4"></div>
              )}
              <form onSubmit={handleSubmit}>
                {["name", "email", "phone", "password", "confirmpassword"].map((field) => (
                  <div className="mb-4" key={field}>
                    <label className="block text-gray-700 text-sm mb-2" htmlFor={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                    <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md px-3 py-2 focus-within:border-green-500">
                      <input
                        id={field}
                        type={field.includes("password") ? "password" : field === "phone" ? "tel" : "text"}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
                        onChange={handleChange}
                        className="appearance-none w-full bg-transparent outline-none border-none focus:outline-none"
                      />
                      <span className="text-gray-500 ml-2">
                        {field === "name" ? <AiOutlineUser /> : field === "email" ? <AiOutlineMail /> : field === "phone" ? <AiOutlinePhone /> : <AiOutlineLock />}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-[#089B7D] text-white py-2 rounded-md shadow-md hover:bg-[#089B7D]/80 focus:outline-none"
                >
                  Register
                </button>
              </form>
            </>
          )}
          <p className="text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-[#089B7D] font-semibold">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
