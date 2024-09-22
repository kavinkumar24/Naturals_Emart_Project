const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../config/Schema'); // Adjust path as necessary
const router = express.Router();

router.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        // Find the user by phone number
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If login is successful, return success response
        res.status(200).json({ message: 'Login successful', user: { name: user.name, phone: user.phone } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
