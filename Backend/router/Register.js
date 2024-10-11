// In your Register.js file
const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../config/Schema');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, phone,address,
        place,thaluka,district,password } = req.body;

    try {
        // Existing user check
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this phone number already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, phone, password: hashedPassword, address, place,thaluka,district });
        await user.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
