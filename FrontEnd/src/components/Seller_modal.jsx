import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { BsHandbag } from "react-icons/bs";
import { PiPlantLight } from "react-icons/pi";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { MdOutlineCategory, MdOutlineDescription, MdOutlineCurrencyRupee } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const SellerDetailModal = ({ seller, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>

          <div className="flex">
          <div className="w-1/3 relative mt-10">
    <Carousel
      showArrows={false}
      infiniteLoop={true}
      showThumbs={false}
      autoPlay={false}
    >
      <div className="relative">
        <img src={seller.image} alt={seller.title} className="object-cover rounded-lg" />
        <div className="flex justify-center mt-2">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white rounded-full p-2 mx-2 w-10"
            onClick={() => {}}
            aria-label="Previous"
          >
            ❮
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white rounded-full p-2 mx-2 w-10"
            onClick={() => {}}
            aria-label="Next"
          >
          </button>
        </div>
      </div>
      
    </Carousel>
  </div>

<div className="w-2/3 pl-6">
  <h2 className="text-2xl font-bold text-left mb-4">{seller.title}</h2>
  <div className="grid grid-cols-3 gap-x-2 gap-y-4"> {/* Grid layout with 3 columns */}
    {/* Detail items */}
    <div className="flex items-center">
      <BsHandbag className="text-gray-500 mr-2" />
      <span className="font-semibold text-gray-800">Weight:</span>
    </div>
    <p className="text-gray-700 font-medium col-span-2">300 kg</p>
    
    <div className="flex items-center">
      <MdOutlineCurrencyRupee className="text-gray-500 mr-2" />
      <span className="font-semibold text-gray-800">Price:</span>
    </div>
    <p className="text-gray-700 font-medium col-span-2">இறைச்சி</p>
    
    <div className="flex items-center">
      <PiPlantLight className="text-gray-500 mr-2" />
      <span className="font-semibold text-gray-800">Material:</span>
    </div>
    <p className="text-gray-700 font-medium col-span-2">ஆக்ரானிக்</p>
    
    <div className="flex items-center">
      <CiLocationOn className="text-gray-500 mr-2" />
      <span className="font-semibold text-gray-800">Location:</span>
    </div>
    <p className="text-gray-700 font-medium col-span-2">{seller.location}</p>
    
    <div className="flex items-center">
      <CiUser className="text-gray-500 mr-2" />
      <span className="font-semibold text-gray-800">Seller:</span>
    </div>
    <p className="text-gray-700 font-medium col-span-2">{seller.sellerName}</p>
    
    
    <div className="flex items-center">
      <MdOutlineCategory className="text-gray-500 mr-2" />
      <span className="font-semibold text-gray-800">Category:</span>
    </div>
    <p className="text-gray-700 font-medium col-span-2">Type</p>
    
    <div className="flex items-center">
      <MdOutlineDescription className="text-gray-500 mr-2" />
      <span className="font-semibold text-gray-800">Description:</span>
    </div>
    <p className="text-gray-700 font-medium col-span-2">Type</p>
  </div>
</div>

        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button className="bg-[#25D366] text-white px-4 py-2 rounded-full flex items-center">
            💬 Whatsapp
          </button>
          <button className="bg-[#089B7D] text-white px-4 py-2 rounded-full">
            📤 பதி்வு
          </button>
          <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-full">
            📞 அழைப்பு/Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDetailModal;
