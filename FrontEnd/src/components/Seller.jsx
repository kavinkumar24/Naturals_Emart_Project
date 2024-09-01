import Navbar from './Navbar';
import { useState } from 'react';
import SellerDetailModal from './Seller_modal';
const SellerCards = () => {
  const [selectedSeller, setSelectedSeller] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sellers = [
    {
      image: 'https://via.placeholder.com/100',
      title: 'corn',
      date: 'Jul 27, 2024 at 07:15pm',
      sellerName: 'Ganesan',
      location: 'Titakudi',
    },
  ];

  const openModal = (seller) => {
    setSelectedSeller(seller);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSeller(null);
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4 p-4">Seller</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {sellers.map((seller, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-xl shadow-zinc-200 p-4 flex items-center border border-solid border-slate-200 cursor-pointer"
              onClick={() => openModal(seller)}
            >
              <img
                src={seller.image}
                alt={seller.title}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{seller.title}</h2>
                <p className="text-gray-500 text-sm mb-2">{seller.date}</p>
                <div className="flex items-center text-gray-700 text-sm mb-1">
                  <span className="mr-2">👤</span>
                  {seller.sellerName}
                </div>
                <div className="flex items-center text-gray-700 text-sm">
                  <span className="mr-2">📍</span>
                  {seller.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Seller Details */}
      <SellerDetailModal
        seller={selectedSeller}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default SellerCards;
