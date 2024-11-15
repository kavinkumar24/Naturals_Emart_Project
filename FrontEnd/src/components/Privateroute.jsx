// PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('token'); 

  return isLoggedIn ? element : <Navigate to="/login" />; // Redirect to login if not logged in
};

export default PrivateRoute;
