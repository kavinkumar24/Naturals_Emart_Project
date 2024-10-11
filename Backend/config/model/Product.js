const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductRequestSchema = new mongoose.Schema({
    title: String,
    product_id: Number,
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
ProductRequestSchema.plugin(AutoIncrement, { inc_field: 'product_id', start_seq: 1 });


// Create the Mongoose model
const ProductRequest = mongoose.model('ProductRequest', ProductRequestSchema);

// Export the model
module.exports = ProductRequest;
