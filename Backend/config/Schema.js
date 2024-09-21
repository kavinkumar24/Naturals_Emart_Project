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
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
