


const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../config/Schema');
const twilio = require('twilio');

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;   
const client = twilio(accountSid, authToken);
console.log('Twilio client:', client);
console.log('Twilio account SID:', accountSid);
console.log('Twilio auth token:', authToken)

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
};

const otpStorage = {}; 
  
router.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this phone number already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = generateOTP();
        otpStorage[phone] = otp;

        // Create a new user
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            otp,
        });

        // Save the user to the database
        await user.save();

        // Send OTP to the user's registered phone number
        await client.messages.create({
            body: `Your OTP is ${otp}`, // Message to send
            from: 9345695264,
            to: phone.length === 10 ? `+91${phone}` : phone.startsWith('+') ? phone : `+${phone}`, 

        });

        res.status(201).json({ message: 'User registered successfully. OTP sent to mobile number.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.post('/api/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  // Retrieve the stored OTP
  const storedOtp = otpStorage[phone];

  if (storedOtp && storedOtp === otp) {
    // OTP is valid
    delete otpStorage[phone]; // Clear the stored OTP after successful verification

    // Here, you can finalize user registration if needed
    res.status(200).json({ message: 'OTP verified. Registration successful.' });
  } else {
    // OTP is invalid
    res.status(400).json({ message: 'Invalid OTP. Please try again.' });
  }
});



module.exports = router;
