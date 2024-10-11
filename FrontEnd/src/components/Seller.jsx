import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SellerDetailModal from './Seller_modal';
import SaleOptionModal from './Seller_type_modal'; 
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from 'axios';
import Image_Not_available from '../assests/photo.png';

const SellerCards = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [currentSaleType, setCurrentSaleType] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  // Fetch sellers from the backend
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sellers');
        const sellers = response.data;

        // Extracting products from sellers, omitting "buyer_request" saleType
        const allProducts = sellers.flatMap(seller => 
          seller.products
            .filter(product => product.saleType !== 'buyer_request')
            .map(product => ({
              ...product,
              sellerName: seller.name,
              sellerId: seller._id,
              sellerLocation: seller.location,
              sellerImage: seller.image,
              sellerPhone: seller.phone,
              thaluka: seller.thaluka,
            }))
        );

        setProducts(allProducts);
        setFilteredProducts(allProducts); // Initially display all products
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, []);

  // Filter products based on sale type and search query
  useEffect(() => {
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!currentSaleType || product.saleType === currentSaleType)
    );
    setFilteredProducts(filtered);
  }, [currentSaleType, products, searchQuery]);

  const openModal = (product) => {
    setSelectedSeller(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSeller(null);
  };

  const handleCreateNew = () => {
    const token = localStorage.getItem('token'); // Check for the token
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      setIsSaleModalOpen(true); // Open the sale option modal if logged in
    }
  };

  const handleSaleOptionSelect = (option) => {
    setIsSaleModalOpen(false);
    if (option === 'one_time_sale') {
      navigate('/one_time_sell_form'); 
    } else if (option === 'regular_sale') {
      navigate('/regular_sell_form'); 
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 py-8">
        <div className="flex justify-between items-center mb-4 p-4">
          <h1 className="text-2xl font-semibold">Seller</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded animate-pulse"
            onClick={handleCreateNew}
          >
            Create New
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="mb-4">
          <div className='grid grid-cols-2 md:grid-cols-7 gap-5 md:gap-0 sm:gap-0'>
            <button
              className={`px-4 py-2 mr-2 rounded ${currentSaleType === 'regular_sale' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setCurrentSaleType('regular_sale')}
            >
              Regular Sale
            </button>
            <button
              className={`px-4 py-2 rounded mr-2 ${currentSaleType === 'one_time_sale' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setCurrentSaleType('one_time_sale')}
            >
              One-Time Sale
            </button>
            <button
              className="px-4 py-2 rounded bg-gray-200 mr-2"
              onClick={() => setCurrentSaleType(null)}
            >
              Show All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {filteredProducts.map((product, index) => (
           <div
           key={index}
           className="bg-white rounded-lg shadow-xl shadow-zinc-200 p-4 flex items-start relative border border-solid border-slate-200 cursor-pointer"
           onClick={() => openModal(product)}
         > 
           <img
             src={product.images[0] || Image_Not_available}
             alt={product.title}
             className="w-16 h-16 rounded-full mr-4 border-4 shadow-lg border-slate-200"
           />
           <div className="flex flex-col flex-grow">
             <h2 className="text-lg font-semibold">{product.title}</h2>
             <p className="text-gray-500 text-sm mb-2">{new Date(product.Approved_at).toLocaleString()}</p>
             
             <div className="flex items-center text-gray-700 text-sm mb-1">
               <span className="mr-2">
                 <IoPersonCircleOutline size={20}/>
               </span>
               <span className='text-sm text-slate-400'> பெயர்:  </span>
               <span className='font-semibold text-md ml-2'> {product.sellerName || 'Unknown Seller'}</span>
             </div>
             <div className="flex items-center text-gray-700 text-sm mt-2">
               <span className="mr-2">
                 <MdOutlineAddLocationAlt size={20} />
               </span>
               <span className='text-sm text-slate-400'> தாலுகா:  </span>
               <span className='font-semibold text-md ml-2'> {product.thaluka}</span>
             </div>
           </div>
           
           {/* Unique ID positioned absolutely */}
           <div className="absolute right-4 top-4 flex items-center justify-center bg-yellow-400 text-black font-bold rounded-full h-10 w-10 text-sm">
             {product.unique_id || 0} {/* Display unique_id here */}
           </div>
         </div>
         
          ))}
        </div>
      </div>

      {/* Modals */}
      <SellerDetailModal
        seller={selectedSeller}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <SaleOptionModal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        onSelectOption={handleSaleOptionSelect}
      />
    </div>
  );
};

export default SellerCards;
