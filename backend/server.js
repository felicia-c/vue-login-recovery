const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from .env file (if using dotenv)
require('dotenv').config();

// Import routes
const userLogin = require('./routes/login');
const passwordResetRoutes = require('./routes/passwordReset');
const userRoutes = require('./routes/userRoutes');
const userRegister = require('./routes/register');
const path = require('path');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/vue-auth-app')
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use(userLogin); // Routes for user login
app.use(passwordResetRoutes); // Routes for password reset
app.use(userRoutes); // Routes for user management
app.use(userRegister); // Routes for register new user

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));