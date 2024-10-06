import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerDetailModal from './Seller_modal';

function Buyer() {

  const [selectedBuyer, setSelectedBuyer] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const buyers = [
    {
      image: 'https://via.placeholder.com/100',
      title: 'corn',
      date: 'Jul 27, 2024 at 07:15pm',
      sellerName: 'Ganesan buy',
      location: 'Titakudi',
    },
  ];


  const openModal = (seller) => {
    setSelectedBuyer(seller);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBuyer(null);
  };

  const handleCreateNew = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
     navigate('/buyer_form');
    }
    , 2000);
  };
  return (
    <div>
       {isloading ? (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
    <p className="ml-4">Loading Buyer form...</p>
  </div>
) : (
  <>
      <Navbar />
      <div className="px-4 py-8">
        <div className="flex justify-between items-center mb-4 p-4">
          <h1 className="text-2xl font-semibold">Buyer</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded animate-pulse" // Add blinking animation
            onClick={handleCreateNew}
          >
            Create New
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {buyers.map((seller, index) => (
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

      <SellerDetailModal
        seller={selectedBuyer}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      </>
        )}
      
    </div>
    
  );
}

export default Buyer
