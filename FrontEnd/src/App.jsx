import { Route ,Routes, Navigate} from 'react-router';
import Seller from './components/Seller';
import Buyer from './components/Buyer';
import Home from './components/Home';
import Login from './components/Login'
import Register from './components/Register';
import Seller_Form from './components/Seller_form_onetime'
import Admin_page from './components/Adminpage'
import Seller_regular from './components/Seller_form_regular';
import Buyerform from './components/Buyer_form';
import AdminLogin from './components/AdminLogin';
import { useState } from 'react';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/seller" element={<Seller />} />
        <Route path='/Buyer' element={<Buyer />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/one_time_sell_form' element={<Seller_Form />} />
        <Route path='/regular_sell_form' element={<Seller_regular />} />
        <Route path='/admin/login' element={<AdminLogin onLogin={handleLogin} />} />

        
        {/* Admin route, protected by authentication check */}
        <Route path='/admin' element={isAuthenticated ? <Admin_page /> : <Navigate to="/admin/login" />} />
        <Route path='/buyer_form' element={<Buyerform />} />
      </Routes>
        
    </>
  )
}

export default App
