import React, { useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 
  const [products, setProducts] = useState([]);

  const handleLogin = async () => {
    setIsLoading(true); 
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message); 
        setIsLoading(false); 
        return;
      }

      const data = await response.json();
      console.log('Login response:', data);
      // Save user data and login state to localStorage
      setUser(data.user);
      localStorage.setItem('isLoggedIn', 'true'); // Save login state
      localStorage.setItem('userData', JSON.stringify(data.user)); // Save user data
      
      alert(data.message); // Display success message
      fetchProducts(data.user.phone);
      navigate('/form'); // Redirect to the form page
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again.');
      setIsLoading(false); // Stop loading animation
    }
  };

  const fetchProducts = async (phone) => {
    try {
        const response = await fetch(`http://localhost:5000/api/Seller/${phone}`);
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message);
            return;
        }

        const data = await response.json();
        console.log('Fetched products:', data.products);
        setProducts(data.products); // Store the products in the state to display in modal
        localStorage.setItem('products', JSON.stringify(data.products)); // Save products to localStorage
    } catch (error) {
        console.error('Error fetching products:', error);
    }

  }
  return (
    <div>
      <Navbar user={user} />
      <div className="min-h-screen flex justify-center items-center md:items-baseline bg-white p-4">
        <div className="bg-zinc-100 p-6 md:p-8 rounded-lg shadow-md max-w-xs md:max-w-sm w-full -mt-64 md:mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Login / உள்நுழைவு</h2>

          {/* Phone Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="phone">
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="appearance-none w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#089B7D]"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#089B7D]"
              required
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className={`w-full bg-[#089B7D] text-white py-2 rounded-md shadow-md focus:outline-none ${isLoading ? 'opacity-50' : 'hover:bg-[#06795F]'}`}
            disabled={isLoading}
          >
            <span className="flex items-center justify-center">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="text-white" cx="12" cy="12" r="10" fill="none" strokeWidth="4" />
                </svg>
              ) : (
                <AiOutlineLogin className="mr-2" />
              )}
              {isLoading ? 'Loading...' : 'Login'}
            </span>
          </button>

          {/* Register Link */}
          <p className="text-center mt-4 text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-[#089B7D] font-semibold">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
