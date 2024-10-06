const express = require("express");
const router = express.Router();
const ProductRequest = require("../config/model/Product");
const User = require("../config/Schema");
const RegularProductRequest = require("../config/model/Regular_Product");
const BuyerProductRequest = require("../config/model/Buyer_product");

// Get all product requests



// Fetch and test RegularProductRequest
// Check regular product requests
router.get("/admin/test-regular-requests", async (req, res) => {
    try {   
        const regularProductRequests = await RegularProductRequest.find().populate('name', 'phone').lean();
        console.log("Regular Product Requests:", regularProductRequests);
        res.status(200).json(regularProductRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching regular product requests", error });
    }
});

// Fetch and test ProductRequest
router.get("/admin/test-product-requests", async (req, res) => {
    try {
        const productRequests = await ProductRequest.find().populate('name', 'phone').lean();
        console.log("Product Requests:", productRequests);
        res.status(200).json(productRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product requests", error });
    }
});

// Combined endpoint to fetch and merge both requests
router.get("/admin/requests", async (req, res) => {
    console.log("GET request for combined product requests received");
    try {
        const [productRequests, regularProductRequests, buyerrequest] = await Promise.all([
            ProductRequest.find().populate('name', 'phone').lean(),
            RegularProductRequest.find().populate('name', 'phone').lean(),
            BuyerProductRequest.find().populate('name', 'phone').lean()
        ]);

        console.log("Product Requests:", productRequests);
        console.log("Regular Product Requests:", regularProductRequests);
        console.log("Buyer Product Requests:", buyerrequest);
        console.log("Number of Regular Product Requests:", regularProductRequests.length);

        // Combine the results
        const allRequests = [...productRequests, ...regularProductRequests, ...buyerrequest];

        console.log("All Combined Requests:", allRequests); // Debugging combined requests

        res.status(200).json({
            message: "Product requests fetched successfully",
            productRequests: allRequests
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching product requests",
            error
        });
    }
});








// Approve or reject a product request
router.post("/admin/approve", async (req, res) => {
    const { id, status, phone, title, description, category } = req.body;

    console.log('POST request to update product request status received');
    console.log('Request ID:', id);
    console.log('Status:', status);
    console.log('Phone:', phone);

    if (!id || !status) {
        return res.status(400).json({ message: 'Missing required fields: id or status' });
    }

    try {
        // Handle removal
        if (status === 'removed') {
            const result = await ProductRequest.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Product request not found' });
            }
            console.log('Product request removed:', id);
            return res.status(200).json({ message: 'Product request removed successfully' });
        }

        // For approvals and edits
        const productRequest = await ProductRequest.findById(id);
        if (!productRequest) {
            return res.status(404).json({ message: 'Product request not found' });
        }

        // Update details if provided
        if (title) productRequest.title = title;
        if (description) productRequest.description = description;
        if (category) productRequest.category = category;

        // Update the status only if it’s approved
        if (status === 'approved') {
            productRequest.status = status; 
        }

        await productRequest.save();

        console.log('Product request updated:', productRequest);

        const user = await User.findOne({ phone });
        if (user) {
            user.products.push({
                title: productRequest.title,
                description: productRequest.description,
                category: productRequest.category,
                organic: productRequest.organic,
                images: productRequest.images,
                size: productRequest.size,
                price: productRequest.price,
                status: productRequest.status,
                saleType: productRequest.saleType
            });
            await user.save();
            console.log('Product added to user:', user);
        }

        res.status(200).json({ message: 'Product request status updated successfully' });
    } catch (error) {
        console.error('Error updating product request:', error);
        res.status(500).json({ message: 'Error updating product request status', error });
    }
});



// Approve or reject a product request
router.post("/admin/approve_regular", async (req, res) => {
    const { id, status, phone, title, description, category } = req.body;

    console.log('POST request to update product request status received');
    console.log('Request ID:', id);
    console.log('Status:', status);
    console.log('Phone:', phone);

    if (!id || !status) {
        return res.status(400).json({ message: 'Missing required fields: id or status' });
    }

    try {
        // Handle removal
        if (status === 'removed') {
            const productRequest = await RegularProductRequest.findById(id);
            if (!productRequest) {
                return res.status(404).json({ message: 'Product request not found' });
            }

            const result = await RegularProductRequest.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Product request not found' });
            }
            console.log('Product request removed:', id);

            // Remove the product from the user's profile
            const user = await User.findOne({ phone });
            if (user) {
                user.products = user.products.filter(product => product.title !== productRequest.title);
                await user.save();
                console.log('Product removed from user:', user);
            }

            return res.status(200).json({ message: 'Product request removed successfully' });
        }

        // For approvals
        const productRequest = await RegularProductRequest.findById(id);
        console.log('Product request found:', productRequest);

        if (!productRequest) {
            return res.status(404).json({ message: 'Product request not found' });
        }

        // Allow approval if it's currently pending
        if (productRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Product request cannot be modified' });
        }

        // Update details if provided
        if (title) productRequest.title = title;
        if (description) productRequest.description = description;
        if (category) productRequest.category = category;

        // Update status to approved
        productRequest.status = status; 
        await productRequest.save();

        console.log('Product request approved:', productRequest);

        const user = await User.findOne({ phone });
        console.log('User found:', user);
        if (user) {
            user.products.push({
                title: productRequest.title,
                description: productRequest.description,
                category: productRequest.category,
                organic: productRequest.organic,
                images: productRequest.images,
                price: productRequest.price,
                status: status,
                saleType: productRequest.saleType
            });
            await user.save();
            console.log('Product added to user:', user);
        }

        res.status(200).json({ message: 'Product request status updated successfully' });
    } catch (error) {
        console.error('Error updating product request:', error);
        res.status(500).json({ message: 'Error updating product request status', error });
    }
});

router.post("/admin/approve_buyer", async (req, res) => {
    const { id, status, phone, title, description, category } = req.body;

    console.log('POST request to update product request status received');
    console.log('Request ID:', id);
    console.log('Status:', status);
    console.log('Phone:', phone);

    if (!id || !status) {
        return res.status(400).json({ message: 'Missing required fields: id or status' });
    }

    try {
        // Handle removal
        if (status === 'removed') {
            const result = await BuyerProductRequest.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Product request not found' });
            }
            console.log('Product request removed:', id);
            return res.status(200).json({ message: 'Product request removed successfully' });
        }

        // For approvals
        const productRequest = await BuyerProductRequest.findById(id);
        console.log('Product request found:', productRequest);

        if (!productRequest) {
            return res.status(404).json({ message: 'Product request not found' });
        }

        // Allow approval if it's currently pending
        if (productRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Product request cannot be modified' });
        }

        // Update details if provided
        if (title) productRequest.title = title;
        if (description) productRequest.description = description;
        if (category) productRequest.category = category;

        // Update status to approved
        productRequest.status = status; 
        await productRequest.save();

        console.log('Product request approved:', productRequest);

        const user = await User.findOne({ phone });
        console.log('User found:', user);
        if (user) {
            user.products.push({
                title: productRequest.title,
                description: productRequest.description,
                category: productRequest.category,
                organic: productRequest.organic,
                images: productRequest.images,
                size: productRequest.size,
                price: productRequest.price,
                status: status,
                saleType: productRequest.saleType
            });
            await user.save();
            console.log('Product added to user:', user);
        }

        res.status(200).json({ message: 'Product request status updated successfully' });
    } catch (error) {
        console.error('Error updating product request:', error);
        res.status(500).json({ message: 'Error updating product request status', error });
    }
}
);



module.exports = router;
