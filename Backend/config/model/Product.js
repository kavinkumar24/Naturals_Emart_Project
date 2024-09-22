const mongoose = require('mongoose');

const ProductRequestSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    images: [String],
    size: String,
    price: Number,
    name: String,
    phone: String,
    address: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

// Create the Mongoose model
const ProductRequest = mongoose.model('ProductRequest', ProductRequestSchema);

// Export the model
module.exports = ProductRequest;
