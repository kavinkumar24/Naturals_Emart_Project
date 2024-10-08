import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SellerDetailModal from './Seller_modal';
import SaleOptionModal from './Seller_type_modal'; // Import the new modal
import axios from 'axios'; // Make sure to install axios

const SellerCards = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [currentSaleType, setCurrentSaleType] = useState(null); // State for current sale type
  const navigate = useNavigate();

  // Fetch sellers from the backend
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sellers'); // Fetching sellers
        const sellers = response.data;

        // Extracting products from sellers, omitting "buyer_request" saleType
        const allProducts = sellers.flatMap(seller => 
          seller.products
            .filter(product => product.saleType !== 'buyer_request') // Filter out buyer_request
            .map(product => ({
              ...product,

              sellerName: seller.name, // Add seller name for reference
              sellerId: seller._id, // Store seller ID if needed
              sellerLocation: seller.location, // Add seller location
              sellerImage: seller.image, // Add seller image
              sellerPhone: seller.phone 
            }))
        );

        setProducts(allProducts); // Set the flat list of products
        setFilteredProducts(allProducts); // Initially display all products
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, []);

  // Filter products based on sale type
  useEffect(() => {
    if (currentSaleType) {
      setFilteredProducts(products.filter(product => product.saleType === currentSaleType));
    } else {
      setFilteredProducts(products); // Show all if no filter is applied
    }
  }, [currentSaleType, products]);

  const openModal = (product) => {
  setSelectedSeller(product); // Set the selected product data
  setIsModalOpen(true); // Open the modal
};


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSeller(null);
  };

  const handleCreateNew = () => {
    setIsSaleModalOpen(true); // Open the sale option modal
  };

  const handleSaleOptionSelect = (option) => {
    setIsSaleModalOpen(false); // Close sale option modal
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

        {/* Filter Buttons */}
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${currentSaleType === 'regular_sale' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentSaleType('regular_sale')}
          >
            Regular Sale
          </button>
          <button
            className={`px-4 py-2 rounded ${currentSaleType === 'one_time_sale' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentSaleType('one_time_sale')}
          >
            One-Time Sale
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-200 ml-2"
            onClick={() => setCurrentSaleType(null)} // Reset filter
          >
            Show All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-xl shadow-zinc-200 p-4 flex items-center border border-solid border-slate-200 cursor-pointer"
              onClick={() => openModal(product)} // Open modal for product
            >
                 <img
        src={product.images[0] || 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg'} // Fallback image
        alt={product.title}
        className="w-16 h-16 rounded-full mr-4" // Ensure image is round
      />
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-500 text-sm mb-2">{product.description || 'No description available'}</p>
                <div className="flex items-center text-gray-700 text-sm mb-1">
                  <span className="mr-2">👤</span>
                  {product.sellerName || 'Unknown Seller'}
                </div>
                <div className="flex items-center text-gray-700 text-sm">
                  <span className="mr-2">💲</span>
                  {product.price || 'No price available'}
                </div>
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
