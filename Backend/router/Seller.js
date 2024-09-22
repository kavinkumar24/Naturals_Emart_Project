const express = require("express");
const router = express.Router();
const ProductRequest = require("../config/model/Product"); 
const User = require("../config/Schema");


router.post("/Seller", async (req, res) => {
    const {
        title,
        description,
        category,
        organic,
        images,
        size,
        price,
        name,
        phone,
        address
    } = req.body;

    if (!title || !description || !category || !size || !price || !name || !phone || !address) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const user = await User.findOne({ phone, name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const productRequest = new ProductRequest({
            title,
            description,
            category,
            organic,
            images,
            size,
            price,
            name,
            phone,
            address,
            status: 'pending', // Automatically set to 'pending'
        });

        // Save to the database
        await productRequest.save();
        res.status(201).json({ message: "Product request submitted successfully", productRequest });
    } catch (error) {
        console.error("Error while submitting product request:", error);
        res.status(500).json({ message: "Error submitting product request", error });
    }
});

  
  

router.get("/Seller/:phone", async (req, res) => {
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
