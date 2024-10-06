const express = require("express");
const router = express.Router();
const User = require("../config/Schema");
const BuyerRequest = require("../config/model/Buyer_product");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dmglyorxo',
    api_key: '453864331963336',
    api_secret: 'pZevPXGx6Qg0FMySJ_Kod40rzz0' 
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/Buyer_one_time", upload.array('images', 5), async (req, res) => {
    const { title, description, category, size, name, phone, address } = req.body;
    console.log('Request body:', req.body);


    if (!title || !description || !category || !size || !name || !phone || !address) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const user = await User.findOne({ phone, name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if(user.products.length >= 5){
            return res.status(400).json({ message: "You already have 5 products. Please remove one before adding a new one." });
        }
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

        const buyerrequest = new BuyerRequest({
            title,
            description,
            category,
            images: uploadedImages||'N/A',
            size,
            name,
            phone,
            address
        })
        await buyerrequest.save();
        // user.products.push(buyerrequest);
        // await user.save();
        console.log('Product added to user:', user);
        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product', error });
    }
}
);

module.exports = router;