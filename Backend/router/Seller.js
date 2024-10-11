    const express = require("express");
    const router = express.Router();
    const ProductRequest = require("../config/model/Product"); 
    const User = require("../config/Schema");
    const RegularProductRequest = require("../config/model/Regular_Product");

    const cloudinary = require('cloudinary').v2;
    const multer = require('multer');

  
    cloudinary.config({
        cloud_name: 'dmglyorxo',
        api_key: '453864331963336',
        api_secret: 'pZevPXGx6Qg0FMySJ_Kod40rzz0' // Add your actual API secret here
    });

    // Configure multer for image uploads
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    router.post("/Seller_one_time", upload.array('images', 5), async (req, res) => {
        const {
            title,
            description,
            category,
            organic,
            size,
            price,
            name,
            phone,
            address,
            category_comes
        } = req.body;

        if (!title || !description || !category || !size || !price || !name || !phone || !address || !category_comes) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const user = await User.findOne({ phone, name });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.products.length >= 5) {
                return res.status(400).json({ message: "You already have 5 products. Please remove one before adding a new one." });
            }

            // Check if files are being received
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No images uploaded." });
            }

            // Upload images to Cloudinary
            const uploadedImages = await Promise.all(req.files.map(file => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error);
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }).end(file.buffer);
                });
            }));

            const productRequest = new ProductRequest({
                title,
                description,
                category,
                organic,
                category_comes,
                images: uploadedImages,
                size,
                price,
                name,
                phone,
                address,
                status: 'pending',
            });

            await productRequest.save();
            res.status(201).json({ message: "Product request submitted successfully", productRequest });
        } catch (error) {
            console.error("Error while submitting product request:", error);
            res.status(500).json({ message: "Error submitting product request", error });
        }
    });



    router.post("/Seller_regular_sale", upload.array('images', 5), async (req, res) => {
        const {
            title,
            description,
            category,
            organic,
            price,
            name,
            phone,
            address,
        } = req.body;

        // Check for missing required fields
        if (!title || !description || !category || !price || !name || !phone || !address) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            // Find the user by phone and name
            const user = await User.findOne({ phone, name });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if files are being received
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No images uploaded." });
            }

            // Upload images to Cloudinary
            const uploadedImages = await Promise.all(req.files.map(file => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error);
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }).end(file.buffer);
                });
            }));

            // Create a new RegularProductRequest document
            const productRequest = new RegularProductRequest({
                title,
                description,
                category,
                organic,
                images: uploadedImages,
                price,
                name,
                phone,
                address,
                saleType: 'regular_sale', // Set saleType to regular_sale
                status: 'pending',
            });

            // Save the product request to the database
            await productRequest.save();
            res.status(201).json({ message: "Product request submitted successfully", productRequest });
        } catch (error) {
            console.error("Error while submitting product request:", error);
            res.status(500).json({ message: "Error submitting product request", error });
        }
    });

    router.get("/checkUserProducts", async (req, res) => {
        const { phone } = req.query;

        try {
            const user = await User.findOne({ phone });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const productCount = user.products.length;
            res.status(200).json({ productCount });
        } catch (error) {
            console.error("Error fetching user products:", error);
            res.status(500).json({ message: "Error fetching user products" });
        }
    });


    router.get("/Seller_one_time/:phone", async (req, res) => {
        const { phone } = req.params;
    
        try {
        // Fetch products based on the phone number
        const products = await Product.find({ phone });
    
        if (!products || products.length === 0) {
            return res
            .status(404)
            .json({ message: "No products found for this user" });
        }
    
        res
            .status(200)
            .json({ message: "Products fetched successfully", products });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products", error });
        }
    });

    //   router.get("/admin/requests", async (req, res) => {
    //     console.log("GET request for product requests received");
    //     try {
    //         const productRequests = await ProductRequest.find(); 
    //         res.status(200).json({ message: "Product requests fetched successfully", productRequests });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Error fetching product requests", error });
    //     }
    // });

    router.post("/api/admin/approve", async (req, res) => {
        const { requestId, status } = req.body; // Request ID from the admin panel

        try {
            const productRequest = await ProductRequest.findById(requestId);
            
            if (!productRequest) {
                return res.status(404).json({ message: 'Product request not found' });
            }

            if (status === 'approved') {
                // Find the user and add the product to their product array
                const user = await User.findById(productRequest.userId);

                if (user) {
                    user.products.push({
                        title: productRequest.title,
                        description: productRequest.description,
                        category: productRequest.category,
                        organic: productRequest.organic,
                        images: productRequest.images,
                        size: productRequest.size,
                        price: productRequest.price,
                        Approved_at: new Date()
                    });

                    await user.save();
                    productRequest.status = 'approved';
                }
            } else {
                productRequest.status = 'rejected';
            }

            await productRequest.save();
            res.status(200).json({ message: 'Product request status updated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating product request status' });
        }
    });

    module.exports = router;
