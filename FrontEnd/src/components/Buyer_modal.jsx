import React from "react";
import { Carousel } from "react-responsive-carousel";
import { BsHandbag } from "react-icons/bs";
import { PiPlantLight } from "react-icons/pi";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { MdOutlineCategory, MdOutlineDescription, MdOutlineCurrencyRupee } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image_Not_available from '../assests/photo.png';

const BuyerModal = ({ seller, isOpen, onClose }) => {
  if (!isOpen || !seller) return null;

  const defaultMobileNumber = "";
  const mobileNumber = seller.sellerPhone
    ? seller.sellerPhone.replace(/\D/g, "")
    : defaultMobileNumber;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl z-10"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Image Carousel */}
    

        {/* Title and Details Section */}
        <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full lg:w-96 mb-4">
          <Carousel showArrows={true} infiniteLoop={true} showThumbs={false} autoPlay={false}>
          {seller.images && seller.images.length > 0 ? (
        seller.images.map((image, index) => (
          <div key={index} className="relative">
            {image ? (
              <img
                src={image}
                alt={seller.title}
                className="object-cover w-full h-[300px] rounded-lg"
              />
            ) : (
              <img
                src={Image_Not_available}
                alt="Image not available"
                className="object-cover w-full h-[300px] rounded-lg"
              />
            )}
          </div>
        ))
      ) : (
        <div className="relative">
          <img
            src={Image_Not_available}
            alt="Image not available"
            className="object-contain h-60 w-60 rounded-lg mt-16"
          />
        </div>
      )}
          </Carousel>
        </div>
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            {/* Title */}
            <h2 className="text-2xl font-bold text-left mb-4">{seller.title}</h2>

            <div className="grid cols-1 md:grid-cols-1 lg:grid-cols-1  xl:grid-cols-1  gap-y-4">
              {/* Detail items */}
              {seller.weight && (
                <div className="flex items-center">
                  <BsHandbag className="text-gray-500 mr-2" />
                  <span className="font-semibold text-gray-800">Weight:</span>
                  <span className="ml-2 text-gray-700 font-medium">{seller.size || "N/A"}</span>
                </div>
              )}

              <div className="flex items-center">
                <MdOutlineCurrencyRupee className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Size:</span>
                <span className="ml-2 text-gray-700 font-medium">{seller.size || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <PiPlantLight className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">ஆர்கானிக்:</span>
                <span className="ml-2 text-gray-700 font-medium">{seller.organic ? "ஆமஂ" : "இல்லை"}</span>
              </div>

              <div className="flex items-center">
                <CiLocationOn className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">தாலுகா/Taluk:</span>
                <span className="ml-2 text-gray-700 font-medium">{seller.thaluka || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <CiUser className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Seller:</span>
                <span className="ml-2 text-gray-700 font-medium">{seller.sellerName || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <MdOutlineCategory className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Category:</span>
                <span className="ml-2 text-gray-700 font-medium">{seller.category || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <MdOutlineCategory className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Type:</span>
                <span className="ml-2 text-gray-700 font-medium">{seller.category_comes || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <MdOutlineDescription className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Description:</span>
                <span className="ml-2 text-gray-700 font-medium">{seller.description || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${mobileNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-4 py-2 rounded-full flex items-center"
          >
            💬 Whatsapp
          </a>

          {/* Call Button */}
          <a
            href={`tel:${mobileNumber}`}
            className="bg-[#4F46E5] text-white px-4 py-2 rounded-full"
          >
            📞 அழைப்பு/Call
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuyerModal;
