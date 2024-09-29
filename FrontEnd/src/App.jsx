import { Route ,Routes} from 'react-router';
import Seller from './components/Seller';
import Buyer from './components/Buyer';
import Home from './components/Home';
import Login from './components/Login'
import Register from './components/Register';
import Seller_Form from './components/Seller_form_onetime'
import Admin_page from './components/Adminpage'
import Seller_regular from './components/Seller_form_regular';
function App() {
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
        <Route path='/admin' element={<Admin_page />} />
      </Routes>
        
    </>
  )
}

export default App
