    import React, { useEffect, useState } from 'react';
    import axios from 'axios';

    const AdminApprovalPage = () => {
        const [productRequests, setProductRequests] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchProductRequests = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/admin/requests');
                    console.log('API Response:', response.data);
                    setProductRequests(response.data.productRequests || []);
                } catch (error) {
                    console.error('Error fetching product requests:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProductRequests();
        }, []);

        const handleApproval = async (requestId, status) => {
            try {
                const response = await axios.post('http://localhost:5000/api/admin/approve', { requestId, status });
                if (response.status === 200) {
                    setProductRequests(prevRequests => 
                        prevRequests.map(request => 
                            request._id === requestId ? { ...request, status } : request
                        )
                    );
                    alert(`Request has been ${status === 'approved' ? 'approved' : 'rejected'}.`);
                }
            } catch (error) {
                console.error('Error updating product request:', error);
                alert('Failed to update request status.');
            }
        };

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
                {productRequests.length === 0 ? (
                    <p className="text-gray-500">No product requests available.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="py-2 px-4 border-b">Title</th>
                                    <th className="py-2 px-4 border-b">Description</th>
                                    <th className="py-2 px-4 border-b">Category</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productRequests.map((request) => (
                                    <tr key={request._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">{request.title}</td>
                                        <td className="py-2 px-4 border-b">{request.description}</td>
                                        <td className="py-2 px-4 border-b">{request.category}</td>
                                        <td className="py-2 px-4 border-b flex gap-2">
                                            <button
                                                onClick={() => handleApproval(request._id, 'approved')}
                                                className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleApproval(request._id, 'rejected')}
                                                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    };

    export default AdminApprovalPage;
