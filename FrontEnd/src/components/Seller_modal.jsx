import React from "react";
import { Carousel } from "react-responsive-carousel";
import { BsHandbag } from "react-icons/bs";
import { PiPlantLight } from "react-icons/pi";
import { CiLocationOn, CiUser } from "react-icons/ci";
import {
  MdOutlineCategory,
  MdOutlineDescription,
  MdOutlineCurrencyRupee,
} from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SellerDetailModal = ({ seller, isOpen, onClose }) => {
  if (!isOpen || !seller) return null;

  // Default mobile number (e.g., an Indian mobile number)
  const defaultMobileNumber = ""; // Change this to a valid default number if needed
  console.log(seller.sellerPhone);

  const mobileNumber = seller.sellerPhone ? seller.sellerPhone.replace(/\D/g, "") : defaultMobileNumber;

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
            <Carousel showArrows={false} infiniteLoop={true} showThumbs={false} autoPlay={false}>
              {seller.images && seller.images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={seller.title} className="object-cover rounded-lg" />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="w-2/3 pl-6">
            <h2 className="text-2xl font-bold text-left mb-4">{seller.title}</h2>
            <div className="grid grid-cols-3 gap-x-2 gap-y-4">
              {/* Detail items */}
              <div className="flex items-center">
                <BsHandbag className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Weight:</span>
              </div>
              <p className="text-gray-700 font-medium col-span-2">{seller.size || "N/A"}</p>

              <div className="flex items-center">
                <MdOutlineCurrencyRupee className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Price:</span>
              </div>
              <p className="text-gray-700 font-medium col-span-2">{seller.price || "N/A"}</p>

              <div className="flex items-center">
                <PiPlantLight className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Material:</span>
              </div>
              <p className="text-gray-700 font-medium col-span-2">{seller.material || "N/A"}</p>

              <div className="flex items-center">
                <CiLocationOn className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Location:</span>
              </div>
              <p className="text-gray-700 font-medium col-span-2">{seller.location || "N/A"}</p>

              <div className="flex items-center">
                <CiUser className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Seller:</span>
              </div>
              <p className="text-gray-700 font-medium col-span-2">{seller.sellerName || "N/A"}</p>

              <div className="flex items-center">
                <MdOutlineCategory className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Category:</span>
              </div>
              <p className="text-gray-700 font-medium col-span-2">{seller.category || "N/A"}</p>

              <div className="flex items-center">
                <MdOutlineDescription className="text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">Description:</span>
              </div>
              <p className="text-gray-700 font-medium col-span-2">{seller.description || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${mobileNumber}`} // Always a valid URL
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-4 py-2 rounded-full flex items-center"
          >
            💬 Whatsapp
          </a>

          {/* Call Button */}
          <a
            href={`tel:${mobileNumber}`} // Always a valid URL
            className="bg-[#4F46E5] text-white px-4 py-2 rounded-full"
          >
            📞 அழைப்பு/Call
          </a>
        </div>
      </div>
    </div>
  );
};

export default SellerDetailModal;
