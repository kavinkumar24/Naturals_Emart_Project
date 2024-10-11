import React, { useState, useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { IoCloseCircle, IoHome } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import logo from "../assests/website_logo.jpg";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router";
import { AiOutlineLogin } from "react-icons/ai";
import Load from "./Loading/Load";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false); // Modal state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUser(userData);
      console.log("User data:", userData);

      // Fetch products from API
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/user/${userData.phone}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setProducts(data.products || []);
          console.log("Product data:", data.products);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      };

      fetchProducts();
    }
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUser(userData);
      console.log("User data:", userData);
    }
  }, []);

  const handleNav = () => {
    setShowMenu(!showMenu);
  };
  const handleopen_close_sidebar = () => {
    setShowProfileModal(true);
    setShowMenu(false);
  };

  const handle_route = (path) => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
      navigate(path);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div
      className={`flex justify-between items-center h-24 max-w-6xl mx-auto px-4`}
    >
      {load && (
        <Load />
      )}

      <img
        src={logo}
        alt="logo"
        className="w-32 h-32 mt-5 object-cover object-center"
      />

      <ul className="flex-grow flex justify-start md:ml-16">
        <li
          className="p-4 w-20 h-10 cursor-pointer font-semibold hover:text-black"
          onClick={() => handle_route("/")}
        >
          Home
        </li>
        <li className="p-4 w-20 h-10 cursor-pointer font-semibold hover:text-black">
          Profile
        </li>
        <li className="md:block lg:block p-4 w-20 h-10 cursor-pointer font-semibold hover:text-black hidden">
          Contact
        </li>
        {/* <li className="px-10 w-20 h-10 hidden md:block lg:block">
          <div className="flex flex-row">
            <input
              type="search"
              placeholder="Search"
              className={`p-2 border rounded-md shadow-md focus:outline-none focus:ring-1`}
            />
            <div className={`flex mt-4 `}>
              <ImSearch className="right-6 relative" />
            </div>
          </div>
        </li> */}
      </ul>

      <ul className="hidden md:flex items-center gap-[2vw]">
        {/* <li className='flex items-center p-4 mx-2 w-30 h-10 cursor-pointer'>
          <AiOutlineLogin className='mr-2' /> Sign Up
        </li> */}

        {user ? (
          <div className="relative mr-2">
            <div className="bg-amber-300 h-10 w-10 rounded-full p-2 flex items-center justify-center">
              <IoPerson
                size={30}
                className="cursor-pointer"
                onClick={() => setShowProfileModal(true)}
              />
            </div>
          </div>
        ) : (
          <li
            className="flex items-center p-4 mx-2 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {/* <AiOutlineLogin className='mr-2' /> Login */}
          </li>
        )}
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {showMenu ? <IoCloseCircle size={30} /> : <CiMenuFries size={30} />}
      </div>

      {showMenu && (
        <div className="fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-slate-500 ease-in-out duration-700 md:hidden z-50">
          <h1 className="w-full text-md text-white p-4">Naturals Emart</h1>
          <ul className="pt-2 uppercase">
            {/* Home Section */}
            <li className="flex items-center space-x-2 p-4 border-b border-zinc-100 text-amber-400">
              <div className="bg-amber-300 h-10 w-10 rounded-full p-2 flex items-center justify-center">
                <IoHome
                  size={30}
                  className="cursor-pointer text-black"
                  onClick={() => setShowProfileModal(true)}
                />
              </div>
              <span>Home</span>
            </li>

            {/* Profile Section or Login Section */}
            {user ? (
              <li
                className="flex items-center space-x-2 p-4 border-b border-zinc-100 text-amber-400"
                onClick={handleopen_close_sidebar}
              >
                <div className="bg-amber-300 h-10 w-10 rounded-full p-2 flex items-center justify-center">
                  <IoPerson
                    size={30}
                    className="cursor-pointer text-black"
                    onClick={() => setShowProfileModal(true)}
                  />
                </div>
                <span>Profile</span>
              </li>
            ) : (
              <li
                className="flex items-center p-4 mx-2 cursor-pointer text-amber-400 border-b border-zinc-100"
                onClick={() => navigate("/login")}
              >
                <AiOutlineLogin className="mr-2 text-black" />
                Login
              </li>
            )}

            {/* Search Section (optional) */}
            <li className="flex items-center p-4 border-b border-zinc-100">
              <input
                type="search"
                placeholder="Search"
                className="p-2 border rounded-md shadow-md focus:outline-none focus:ring-1 w-full"
              />
              <div className="flex mt-1">
                <ImSearch className="ml-2" />
              </div>
            </li>
          </ul>
        </div>
      )}

   {/* Profile Modal */}
   {showProfileModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-sm md:max-w-lg lg:max-w-xl mx-auto my-8 max-h-[80vh] overflow-hidden">
      <h2 className="text-xl font-bold mb-4 text-center">User Profile</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <p className="text-gray-700">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="text-gray-700">
          <strong>Thaluka:</strong> {user.thaluka}
        </p>
        <p className="text-gray-700">
          <strong>District:</strong> {user.district}
        </p>
       
      </div>

      {/* Product List */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Products</h3>
        {products.length > 0 ? (
          <div className="max-h-48 overflow-y-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Title</th>
                  <th className="border px-4 py-2 text-left">Sale Type</th>
                  <th className="border px-4 py-2 text-left">Id</th>
                  <th className="border px-4 py-2 text-left">Images</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border px-4 py-2">{product.title}</td>
                    <td className="border px-4 py-2">{product.saleType}</td>
                    <td className="border px-4 py-2">{product.unique_id}</td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center">
                        {product.images && product.images.length > 0 ? (
                          <>
                            <button
                              onClick={() => openImageModal(product.images[0])}
                              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mx-1"
                            >
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-full object-cover rounded-full"
                              />
                            </button>
                            {product.images.length > 1 && (
                              <button
                                onClick={() => openImageModal(product.images[1])}
                                className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mx-1"
                              >
                                <img
                                  src={product.images[1]}
                                  alt={product.title}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </button>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No products found for this user.</p>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="flex-1 bg-slate-300 text-gray-500 hover:text-gray-700 py-2 rounded-md mr-2"
          onClick={() => setShowProfileModal(false)}
        >
          Close
        </button>
        <button
          className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 ml-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}




    </div>
  );
}

export default Navbar;
