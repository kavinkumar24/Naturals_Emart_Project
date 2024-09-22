// In your user.js file
const express = require('express');
const User = require('../config/Schema');
const router = express.Router();

// Endpoint to get user details by phone number
router.get('/user/:phone', async (req, res) => {
    const { phone } = req.params;
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
