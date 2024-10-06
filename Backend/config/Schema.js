const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    address: {
        type: String,
        required: true,
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
        saleType:  String
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
