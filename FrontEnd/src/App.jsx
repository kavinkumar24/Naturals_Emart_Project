import { Route, Routes, Navigate } from 'react-router';
import Seller from './components/Seller';
import Buyer from './components/Buyer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Seller_Form from './components/Seller_form_onetime';
import Admin_page from './components/Adminpage';
import Seller_regular from './components/Seller_form_regular';
import Buyerform from './components/Buyer_form';
import AdminLogin from './components/AdminLogin';
import { useState, useEffect } from 'react';
import PrivateRoute from './components/Privateroute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn');
    setIsAuthenticated(adminIsLoggedIn === 'true');
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('adminIsLoggedIn', 'true');
    console.log('Admin logged in');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminIsLoggedIn');
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check for user login status

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/seller" element={<Seller />} />
        <Route path='/buyer' element={<Buyer />} />
        
        {/* Conditional rendering for login and register routes */}
        <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
        
        <Route path='/admin/login' element={<AdminLogin onLogin={handleLogin} />} />
        
        <Route path='/admin' element={isAuthenticated ? <Admin_page onLogout={handleLogout} /> : <Navigate to="/admin/login" />} />
        <Route path='/one_time_sell_form' element={<PrivateRoute element={<Seller_Form />} />} />
        <Route path='/regular_sell_form' element={<PrivateRoute element={<Seller_regular />} />} />
        <Route path='/buyer_form' element={<PrivateRoute element={<Buyerform />} />} />
      </Routes>
    </>
  );
}

export default App;
