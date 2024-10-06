const mongoose = require('mongoose');

const BuyerRequestSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    images: [String],
    size: Number,
    name: String,
    phone: String,
    address: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: { type: Date, default: Date.now },
    saleType: { type: String, default: 'buyer_request' }  // Set default to 'regular_sale'
});

// Create the Mongoose model
const BuyerRequest = mongoose.model('BuyerRequest', BuyerRequestSchema);

// Export the model
module.exports = BuyerRequest;
