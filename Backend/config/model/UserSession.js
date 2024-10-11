// models/UserSession.js
const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isLoggedIn: { type: Boolean, default: false },
  lastLogin: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
