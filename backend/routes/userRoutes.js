const express = require('express');
const User = require('../models/User'); // Import the User model

const router = express.Router();

// Route to get all users
router.get('/api/users', async (req, res) => {
    try {
        // Fetch all users from the database, selecting username and email
        const users = await User.find({}, 'username email');
        res.json(users); // Send the list of users back to the client
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users.' });
    }
});

// Update user information (PUT /api/users/:id)
router.put('/api/users/:id', async (req, res) => {
    const { username, email } = req.body;

    try {
        // Find user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the new email or username is already taken by another user
        const existingEmail = await User.findOne({ email, _id: { $ne: user._id } });
        const existingUsername = await User.findOne({ username, _id: { $ne: user._id } });

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use by another user.' });
        }

        if (existingUsername) {
            return res.status(400).json({ message: 'Username already in use by another user.' });
        }

        // Update user's info
        user.username = username || user.username;
        user.email = email || user.email;

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