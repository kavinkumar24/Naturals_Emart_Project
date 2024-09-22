const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
  
    isVerified: {
        type: Boolean,
        default: false,
    },
    products: [{
        title: String,
        description: String,
        category: String,
        organic: Boolean,
        images: [String],
        size: String,
        price: Number,
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    }],
});


const User = mongoose.model('User', userSchema);

module.exports = User;
