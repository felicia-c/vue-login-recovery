const express = require('express');
const User = require('../models/User'); // Import the User model
const multer = require('multer'); // Import Multer for file uploads
const path = require('path');
const fs = require('fs'); // To check and create the directory if needed
const router = express.Router();


// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
}

// Configure Multer to store uploaded files in the 'uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Upload folder path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Save files with unique names
    }
});

const upload = multer({ storage }); // Set up Multer with the defined storage settings


// Route to get all users
router.get('/api/users', async (req, res) => {
    try {
        // Fetch all users from the database, selecting username and email
        const users = await User.find({}, 'username email profilePicture');
        res.json(users); // Send the list of users back to the client
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users.' });
    }
});
// get the connected user
const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT and populate req.user
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user info to req
        next();
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed.' });
    }
};

// Use this middleware in routes that require authentication
router.get('/api/me', authMiddleware, async (req, res) => {
    try {
        // Fetch the logged-in user's data
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user data back to the frontend (including profilePicture)
        res.json({
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture, // Assuming this is the stored image path
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data.' });
    }
});

// Update user information (PUT /api/users/:id)
router.put('/api/users/:id', upload.single('profilePicture'), async (req, res) => {
    const { username, email } = req.body;

    try {
        // Find user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the new email or username is already taken by another user
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: 'E-mail déjà utilisé' });
        }
        if (existingUsername && existingUsername._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: 'Nom d\'utilisateur déjà utilisé' });
        }

        // Update user data
        user.username = username || user.username; // Update only if a new username is provided
        user.email = email || user.email; // Update only if a new email is provided

        // If you're handling profile picture upload (optional)
        if (req.file) {
            user.profilePicture = req.file.filename; // Assuming you're using multer for file uploads
        }

        await user.save();

        res.json({ message: 'User updated successfully.', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user.' });
    }
});

// Delete a user by ID
router.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: `User ${user.username} deleted successfully.` });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user.' });
    }
});

module.exports = router;