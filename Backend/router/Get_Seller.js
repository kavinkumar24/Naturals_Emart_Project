const express = require('express');
const User = require('../config/Schema'); // Adjust path based on your project structure
const router = express.Router();


router.get('/sellers', async (req, res) => {
    try {
        const sellers = await User.find({ 'products.0': { $exists: true } }); // Find users with at least one product
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sellers' });
    }
});

module.exports = router;
