import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const AdminApprovalPage = () => {
  const [productRequests, setProductRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRequest, setEditingRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [viewCategory, setViewCategory] = useState("one_time_sale");
  const [currentImage, setCurrentImage] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const [imageIndex, setImageIndex] = useState(0); // To track the current image index
  const [imageList, setImageList] = useState([]); // To stor
  const fetchProductRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/requests");
      console.log(response.data);
      setProductRequests(response.data.productRequests || []);
    } catch (error) {
      console.error("Error fetching product requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductRequests();
  }, []);

  const handleImageView = (images) => {
    if (images && images.length > 0) {
      setImageList(images); // Store all images
      setCurrentImage(images[0]); // Set the current image to the first one
      setImageIndex(0); // Start at the first image
      setImageModalOpen(true);
    } else {
      setCurrentImage('fallback_image_url');
      setImageModalOpen(true);
    }
  };

  const goToPreviousImage = () => {
    setImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imageList.length - 1));
    setCurrentImage(imageList[(imageIndex > 0 ? imageIndex - 1 : imageList.length - 1)]);
  };

  const goToNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex < imageList.length - 1 ? prevIndex + 1 : 0));
    setCurrentImage(imageList[(imageIndex < imageList.length - 1 ? imageIndex + 1 : 0)]);
  };

  const handleEditClick = (request) => {
    setEditingRequest(request);
    setModalOpen(true);
    setEditedDetails({
      title: request.title,
      description: request.description,
      category: request.category
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleApproval = async (id, status, phone) => {
    try {
      const detailsToUse = editingRequest ? editedDetails : {};
      const response = await axios.post("http://localhost:5000/api/admin/approve", {
        id,
        status,
        phone,
        ...detailsToUse,
      });

      if (response.status === 200) {
        alert(`Request has been ${status === "approved" ? "approved" : "removed"}.`);
        fetchProductRequests();
      } else {
        throw new Error("Failed to update request status.");
      }
    } catch (error) {
      console.error("Error updating product request:", error);
      alert("Failed to update request status. Please try again.");
    } finally {
      setEditingRequest(null);
      setModalOpen(false);
    }
  };
  const handleApproval_regular = async (id, status, phone,saleType) => {
    try {
      const detailsToUse = editingRequest ? editedDetails : {};
      const response = await axios.post("http://localhost:5000/api/admin/approve_regular", {
        id,
        status,
        phone,
        ...detailsToUse,
      });

      if (response.status === 200) {
        alert(`Request has been ${status === "approved" ? "approved" : "removed"}.`);
        fetchProductRequests();
      } else {
        throw new Error("Failed to update request status.");
      }
    } catch (error) {
      console.error("Error updating product request:", error);
      alert("Failed to update request status. Please try again.");
    } finally {
      setEditingRequest(null);
    }
  };
  const handleApproval_buyer = async (id, status, phone) => {
    try {
      const detailsToUse = editingRequest ? editedDetails : {};
      const response = await axios.post("http://localhost:5000/api/admin/approve_buyer", {
        id,
        status,
        phone,
        ...detailsToUse,
      });
      if(response.status === 200){
        alert(`Request has been ${status === "approved" ? "approved" : "removed"}.`);
        fetchProductRequests();
      }else{
        throw new Error("Failed to update request status.");
      }
    } catch (error) {
      console.error("Error updating product request:", error);
      alert("Failed to update request status. Please try again.");
    } finally {
      setEditingRequest(null);
    }
  };



  // Split requests based on saleType
  const oneTimeSaleRequests = productRequests.filter(request => request.saleType === "one_time_sale");
  const regularSaleRequests = productRequests.filter(request => request.saleType === "regular_sale");
  const buyerRequests = productRequests.filter(request => request.saleType === "buyer_request");
  



  // Filter requests based on search query
  const filterRequests = (requests) => requests.filter(request => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return request.title.toLowerCase().includes(lowerCaseQuery) ||
           request.description.toLowerCase().includes(lowerCaseQuery) ||
           request.category.toLowerCase().includes(lowerCaseQuery) ||
           request.name?.toLowerCase().includes(lowerCaseQuery) || 
           request.phone?.toLowerCase().includes(lowerCaseQuery) || 
           new Date(request.createdAt).toLocaleString().toLowerCase().includes(lowerCaseQuery);
  });

  const filteredOneTimeSaleRequests = filterRequests(oneTimeSaleRequests);
  const filteredRegularSaleRequests = filterRequests(regularSaleRequests);
  const filteredBuyerRequests = filterRequests(buyerRequests);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="ml-4">Loading product requests...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Approval Requests</h1>

      {/* Category Toggle Buttons */}
      <div className="mb-4">
        <button
          onClick={() => setViewCategory("one_time_sale")}
          className={`mr-4 p-2 ${viewCategory === "one_time_sale" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          One Time Sale
        </button>
        <button
          onClick={() => setViewCategory("regular_sale")}
          className={`mr-2 p-2 ${viewCategory === "regular_sale" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Regular Sale
        </button>
        <button
          onClick={() => setViewCategory("buyer_request")}
          className={`p-2 ${viewCategory === "buyer_request" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Buyer Products
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />

      {/* Render based on selected category */}
      {viewCategory === "one_time_sale" ? (
  <>
    <h2 className="text-xl font-bold">One Time Sale Requests</h2>
    {filteredOneTimeSaleRequests.length === 0 ? (
      <p className="text-gray-500">No One Time Sale requests available.</p>
    ) : (
      <RequestTable 
        requests={filteredOneTimeSaleRequests} 
        handleEditClick={handleEditClick}
        handleApproval={handleApproval}
        handleImageView={handleImageView} // Pass function as prop
      />
    )}
  </>
) : viewCategory === "regular_sale" ? (
  <>
    <h2 className="text-xl font-bold">Regular Sale Requests</h2>
    {filteredRegularSaleRequests.length === 0 ? (
      <p className="text-gray-500">No Regular Sale requests available.</p>
    ) : (
      <RequestTable 
        requests={filteredRegularSaleRequests} 
        handleEditClick={handleEditClick}
        handleApproval={handleApproval_regular}
        handleImageView={handleImageView} // Pass function as prop
      />
    )}
  </>
) : viewCategory === "buyer_request" ? (
  <>
    <h2 className="text-xl font-bold">Buyer Requests</h2>
    {filteredBuyerRequests.length === 0 ? (
      <p className="text-gray-500">No Buyer requests available.</p>
    ) : (
      <RequestTable 
        requests={filteredBuyerRequests} 
        handleEditClick={handleEditClick}
        handleApproval={handleApproval_buyer}
        handleImageView={handleImageView} // Pass function as prop
      />
    )}
  </>
) : (
  <p className="text-gray-500">Select a category to view requests.</p>
)}

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          {editingRequest && (
            <div className="bg-white p-4 border border-gray-300 rounded">
              <h2 className="text-lg font-bold mb-4">Edit Request</h2>
              
              <input
                type="text"
                name="title"
                value={editedDetails.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              
              <textarea
                name="description"
                value={editedDetails.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              
              <input
                type="text"
                name="category"
                value={editedDetails.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="border border-gray-300 rounded p-2 mb-4 w-full"
              />
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    handleApproval(editingRequest._id, 'approved', editingRequest.phone);
                    setModalOpen(false);  // Close the modal after saving
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Changes & Approve
                </button>
                <button
                  onClick={() => setModalOpen(false)}  // Close the modal
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

{imageModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded relative">
            <img src={currentImage} alt="Current" className="max-w-full max-h-screen" />
            <div className="flex justify-between items-center mt-4">
              <button onClick={goToPreviousImage} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Previous
              </button>
              <span className="text-center">
                Image {imageIndex + 1} of {imageList.length}
              </span>
              <button onClick={goToNextImage} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Next
              </button>
            </div>
            <button
              onClick={() => setImageModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 absolute top-4 right-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

// Table component to render requests
const RequestTable = ({ requests, handleEditClick, handleApproval, handleImageView }) => (
  <div className="overflow-x-auto">
    
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="py-2 px-4 border-b">Title</th>
          <th className="py-2 px-4 border-b">Description</th>
          <th className="py-2 px-4 border-b">Category</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Phone</th>
          <th className="py-2 px-4 border-b">Image</th>
          <th className="py-2 px-4 border-b">Created</th>
          <th className="py-2 px-20 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request._id}>
            <td className="py-2 px-4 border-b">{request.title}</td>
            <td className="py-2 px-4 border-b">{request.description}</td>
            <td className="py-2 px-4 border-b">{request.category}</td>
            <td className="py-2 px-4 border-b">{request.name}</td>
            <td className="py-2 px-4 border-b">{request.phone}</td>
            <td className="py-2 px-4 border-b">
              <button 
                className="bg-blue-500 text-white px-2 py-2 h-10 rounded hover:bg-blue-600"
                onClick={() => handleImageView(request.images)} // Use an arrow function here
              >
                View
              </button>
            </td>
            <td className="py-2 px-4 border-b">
              {new Date(request.createdAt).toLocaleString()}
            </td>
            <td className="py-2 px-4 border-b">
  <div className="flex items-center">
    <button
      onClick={() => handleEditClick(request)}
      className="text-white bg-sky-600 py-2 px-2 rounded-md shadow-md"
    >
      <FaEdit />
    </button>
    <button
      onClick={() =>
        handleApproval(request._id, "approved", request.phone, request.saleType)
      }
      className={`ml-4 px-2 py-2 rounded-md 
        ${request.status === "approved" ? "bg-green-400 cursor-not-allowed text-gray-800" : "bg-green-500 hover:bg-green-700 text-gray-50"}
      `}
      disabled={request.status === "approved"}
    >
      {request.status === "approved" ? "Approved" : "Approve"}
    </button>
    <button 
    className='ml-4 px-2 py-2 rounded-md bg-red-600 text-white'
      onClick={() =>
        handleApproval(request._id, "removed", request.phone)
      }
     
    >
      Remove
    </button>
  </div>
</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminApprovalPage;
