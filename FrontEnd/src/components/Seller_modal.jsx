import React from 'react';

const SellerDetailModal = ({ seller, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Content */}
        <h2 className="text-2xl font-bold text-center mb-4">{seller.title}</h2>
        <div className="flex items-start mb-4">
          <img
            src={seller.image}
            alt={seller.title}
            className="w-40 h-40 object-cover rounded-lg mr-6"
          />
          <div>
            <div className="flex items-center mb-2">
              <span className="mr-2">🔒</span>
              <p className="text-gray-700 font-medium">300 kg</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">💰</span>
              <p className="text-gray-700 font-medium">இறைச்சி</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">🌾</span>
              <p className="text-gray-700 font-medium">ஆக்ரானிக்</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">📍</span>
              <p className="text-gray-700 font-medium">{seller.location}</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">👤</span>
              <p className="text-gray-700 font-medium">{seller.sellerName}</p>
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">🏠</span>
              <p className="text-gray-700 font-medium">Cuddalore</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          ஆரோக்கியமானமற்றும் சிறப்பான வகையிலான இறைச்சி அரிசி.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center">
            💬 Whatsapp
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
            📤 பதி்வு
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full">
            📞 அழைப்பு/Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDetailModal;
