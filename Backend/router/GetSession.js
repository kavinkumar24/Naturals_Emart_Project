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


module.exports = router;
