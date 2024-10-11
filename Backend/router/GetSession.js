const express = require('express');
const UserSession = require('../config/model/UserSession');
const router = express.Router();

// Get user session by user ID
router.get('/usersession/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userSession = await UserSession.findOne({ userId });

        if (!userSession) {
            return res.status(404).json({ message: 'User session not found' });
        }

        res.status(200).json({
            userId: userSession.userId,
            isLoggedIn: userSession.isLoggedIn,
            lastLogin: userSession.lastLogin,
        });
    } catch (error) {
        console.error('Error retrieving user session:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update user session on logout
router.put('/usersession/logout/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Update the user session to set isLoggedIn to false
      const userSession = await UserSession.findOneAndUpdate(
        { userId },
        { isLoggedIn: false, lastLogin: Date.now() }, // Update the login status and timestamp
        { new: true }
      );
  
      if (!userSession) {
        return res.status(404).json({ message: 'User session not found' });
      }
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;
