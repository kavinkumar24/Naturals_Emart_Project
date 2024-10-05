const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const DB = process.env.URL;

if (!DB) {
    console.error("Database URL is not set");
    process.exit(1);
}

const connectToDb = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        });
        console.log("Connected to DB");
    } catch (err) {
        console.error("Failed to connect to DB:", err);
        process.exit(1); 
    }
};

module.exports = connectToDb;
