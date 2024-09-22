const express = require("express");
const router = express.Router();
const Product = require("../config/model/Product"); 
const User = require("../config/Schema");
const ProductRequest = require('../config/model/Product');


router.get("/admin/requests", async (req, res) => {
    console.log("GET request for product requests received");
    try {
        const productRequests = await ProductRequest.find(); 
        res.status(200).json({ message: "Product requests fetched successfully", productRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product requests", error });
    }
});
router.post('/admin/approve', async (req, res) => {
    const { requestId, status } = req.body;
    console.log('POST request to update product request status received');
    console.log('Request ID:', requestId);
    console.log('Status:', status);

    try {
        // Find the product request by its ID
        const productRequest = await ProductRequest.findById(requestId);
        if (!productRequest) {
            return res.status(404).json({ message: 'Product request not found' });
        }

        // Find the user by mobile number (assuming productRequest contains the phone)
        const user = await User.findOne({ phone: productRequest.phone });
        console.log('User found:', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user already has 5 approved products
        if (user.products.length >= 5) {
            return res.status(400).json({ message: 'User already has 5 approved products' });
        }

        // Create the approved product object
        const approvedProduct = {
            title: productRequest.title,
            description: productRequest.description,
            category: productRequest.category,
            organic: productRequest.organic,
            images: productRequest.images,
            size: productRequest.size,
            price: productRequest.price,
            status: 'approved'
        };

        // Add the approved product to the user's products array
        user.products.push(approvedProduct);
        console.log('Approved product added:', approvedProduct);

        // Optionally, you can remove the request after approving it
        // await ProductRequest.deleteOne({ _id: requestId });

        // Save the updated user document
        const updatedUser = await user.save();
        console.log('User updated successfully:', updatedUser);

        res.status(200).json({ message: 'Product request approved and stored successfully', product: approvedProduct });
    } catch (error) {
        console.error('Error updating product request:', error);
        res.status(500).json({ message: 'Error updating product request status', error });
    }
});





module.exports = router;

