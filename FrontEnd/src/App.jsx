import { Route ,Routes} from 'react-router';
import Seller from './components/Seller';
import Buyer from './components/Buyer';
import Home from './components/Home';
import Login from './components/Login'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/seller" element={<Seller />} />
        <Route path='/Buyer' element={<Buyer />} />
        <Route path='/login' element={<Login />} />
      </Routes>
        
    </>
  )
}

export default App
