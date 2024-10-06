// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your actual authentication logic
    if (username === 'admin' && password === 'password') {
      onLogin(); // Call the onLogin function passed as a prop
      alert('Login successful!');
      setIsLoggedIn(true); // Update the login status
      navigate('/admin'); // Redirect to admin page
    } else {
      setError('Invalid username or password');
    }
  };

  // If already logged in, redirect to admin
  if (isLoggedIn) {
    return null; // Prevent rendering anything if redirecting
  }

  return (
    <div>
      <h2>Admin Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
