import { Route ,Routes} from 'react-router';
import Seller from './components/Seller';
import Buyer from './components/Buyer';
import Home from './components/Home';
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/seller" element={<Seller />} />
        <Route path='/Buyer' element={<Buyer />} />
      </Routes>
        
    </>
  )
}

export default App
