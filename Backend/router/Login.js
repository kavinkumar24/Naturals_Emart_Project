const express = require("express");
const bcrypt = require("bcryptjs");
const UserSession = require("../config/model/UserSession");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const User = require("../config/Schema"); // Adjust path as necessary
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  try {
    // Find the user by phone number
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Create or update user session
    const session = await UserSession.findOneAndUpdate(
      { userId: user._id },
      { isLoggedIn: true, lastLogin: Date.now() },
      { upsert: true, new: true } // Create a new session if it doesn't exist
    );

    // Check if session update was successful
    if (!session) {
      console.error("Failed to update user session");
      return res.status(500).json({ message: "Failed to update user session" });
    }

    // Send the token and user data in response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        thaluka: user.thaluka,
        district: user.district,
        address: user.address,
        place: user.place,
      },
      userSession: {
        userId: session.userId,
        isLoggedIn: session.isLoggedIn,
        lastLogin: session.lastLogin,
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
