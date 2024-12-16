// Import Mongoose
const mongoose = require('mongoose');


// Function to connect to MongoDB
const connectDB = async() => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {

        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process with failure
    }
};

// Export the connection function
module.exports = connectDB;