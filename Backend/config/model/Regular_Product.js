const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);


const RegularProductRequestSchema = new mongoose.Schema({
    title: String,
    regular_product_id: Number, 
    description: String,
    category: String,
    images: [String],
    price: Number,
    name: String,
    phone: String,
    address: String,
    organic: Boolean,  // This field can remain if needed
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: { type: Date, default: Date.now },
    saleType: { type: String, enum: ['regular_sale'], default: 'regular_sale' }  // Set default to 'regular_sale'
});

RegularProductRequestSchema.plugin(AutoIncrement, { inc_field: 'regular_product_id', start_seq: 1 });


// Create the Mongoose model
const RegularProductRequest = mongoose.model('RegularProductRequest', RegularProductRequestSchema);

// Export the model
module.exports = RegularProductRequest;
