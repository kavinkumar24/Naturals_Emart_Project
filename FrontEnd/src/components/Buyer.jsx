import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerDetailModal from "./Seller_modal";
import Image_Not_available from "../assests/photo.png";
import axios from "axios";
import BuyerModal from "./Buyer_modal";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineAddLocationAlt } from "react-icons/md";

function Buyer() {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sellers");
        const sellers = response.data;

        // Extracting products from sellers, omitting "buyer_request" saleType
        const allProducts = sellers.flatMap((seller) =>
          seller.products
            .filter((product) => product.saleType === "buyer_request")
            .map((product) => ({
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
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const buyers = [
    {
      image: "https://via.placeholder.com/100",
      title: "corn",
      date: "Jul 27, 2024 at 07:15pm",
      sellerName: "Ganesan buy",
      location: "Titakudi",
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
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a new buyer form.");
      navigate("/login");
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/buyer_form");
    }, 2000);
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
              {filteredProducts.map((seller, index) => (
              <div
              key={index}
              className="bg-white rounded-lg shadow-xl shadow-zinc-200 p-4 flex items-start relative border border-solid border-slate-200 cursor-pointer"
              onClick={() => openModal(seller)}
            >
              <img
                src={seller.images[0] || Image_Not_available}
                alt={seller.title}
                className="w-16 h-16 rounded-full mr-4 border-4 shadow-lg border-slate-200"
              />
              <div className="flex flex-col flex-grow ml-5">
                <h2 className="text-lg font-semibold">{seller.title}</h2>
                <p className="text-gray-500 text-sm mb-2">{seller.date}</p>
                <div className="flex items-center text-gray-700 text-sm mb-1">
                  <span className="mr-2">
                    <IoPersonCircleOutline size={20} />
                  </span>
                  <span className="text-sm text-slate-400"> பெயர்: </span>
                  <span className="font-semibold text-md ml-2">{seller.sellerName}</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm mb-1 mt-3">
                  <span className="mr-2">
                    <MdOutlineAddLocationAlt size={20} />
                  </span>
                  <span className="text-sm text-slate-400"> தாலுகா: </span>
                  <span className="font-semibold text-md ml-2">{seller.thaluka}</span>
                </div>
              </div>
            
              {/* Unique ID positioned absolutely */}
              <div className="absolute right-4 top-4 flex items-center justify-center bg-yellow-400 text-black font-bold rounded-full h-10 w-10 text-sm">
                {seller.unique_id || 0} {/* Display unique_id here */}
              </div>
            </div>
            
              ))}
            </div>
          </div>

          <BuyerModal
            seller={selectedBuyer}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </>
      )}
    </div>
  );
}

export default Buyer;
