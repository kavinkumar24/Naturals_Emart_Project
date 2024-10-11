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
    const user = await User.findOne({ phone });
    console.log("Fetched user from DB:", user); // Log the user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user.isVerified,
        name: user.name,
        phone: user.phone,
        thaluka: user.thaluka,
        district: user.district,
        address: user.address,
        place: user.place,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
