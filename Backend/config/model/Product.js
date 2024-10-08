const mongoose = require('mongoose');

const ProductRequestSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    category_comes: String,
    images: [String],
    size: String,
    price: Number,
    name: String,
    phone: String,
    address: String,
    organic: Boolean, 
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: { type: Date, default: Date.now },
    saleType: { type: String, enum: ['one_time_sale'], default: 'one_time_sale' }  // Added this field
});

// Create the Mongoose model
const ProductRequest = mongoose.model('ProductRequest', ProductRequestSchema);

// Export the model
module.exports = ProductRequest;
