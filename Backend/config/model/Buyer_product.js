const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BuyerRequestSchema = new mongoose.Schema({
    title: String,
    unique_id: Number,
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

BuyerRequestSchema.plugin(AutoIncrement, { inc_field: 'unique_id', start_seq: 1 });

// Create the Mongoose model
const BuyerRequest = mongoose.model('BuyerRequest', BuyerRequestSchema);

// Export the model
module.exports = BuyerRequest;
