import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminApprovalPage = () => {
  const [productRequests, setProductRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRequest, setEditingRequest] = useState(null);
  const [editedDetails, setEditedDetails] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [viewCategory, setViewCategory] = useState("one_time_sale");


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

  const handleEditClick = (request) => {
    setEditingRequest(request);
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

  const handleApproval = async (id, status, phone,saleType) => {
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


  // Split requests based on saleType
  const oneTimeSaleRequests = productRequests.filter(request => request.saleType === "one_time_sale");
  const regularSaleRequests = productRequests.filter(request => request.saleType === "regular_sale");

  console.log("One Time Sale Requests:", oneTimeSaleRequests); // Log for debugging
  console.log("Regular Sale Requests:", regularSaleRequests); // Log for debugging

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
          className={`p-2 ${viewCategory === "regular_sale" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Regular Sale
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
            />
          )}
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">Regular Sale Requests</h2>
          {filteredRegularSaleRequests.length === 0 ? (
            <p className="text-gray-500">No Regular Sale requests available.</p>
          ) : (
            <RequestTable 
              requests={filteredRegularSaleRequests} 
              handleEditClick={handleEditClick}
              handleApproval={handleApproval_regular}
            />
          )}
        </>
      )}

      {editingRequest && (
        <div className="mb-4 p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-bold">Edit Request</h2>
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
            className="border border-gray-300 rounded p-2 mb-2 w-full"
          />
          <button
            onClick={() => handleApproval(editingRequest._id, 'approved', editingRequest.phone)}
            className="text-blue-500"
          >
            Save Changes & Approve
          </button>
          <button
            onClick={() => setEditingRequest(null)}
            className="text-red-500 ml-4"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

// Table component to render requests
const RequestTable = ({ requests, handleEditClick, handleApproval }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="py-2 px-4 border-b">Title</th>
          <th className="py-2 px-4 border-b">Description</th>
          <th className="py-2 px-4 border-b">Category</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Phone</th>
          <th className="py-2 px-4 border-b">Created</th>
          <th className="py-2 px-4 border-b">Actions</th>
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
              {new Date(request.createdAt).toLocaleString()}
            </td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => handleEditClick(request)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  handleApproval(request._id, "approved", request.phone, request.saleType)
                }
                className="text-green-500 ml-4"
                disabled={request.status === "approved"}
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleApproval(request._id, "removed", request.phone)
                }
                className="text-gray-500 ml-4"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminApprovalPage;
