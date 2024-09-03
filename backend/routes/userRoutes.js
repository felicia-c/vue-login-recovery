const express = require('express');
const User = require('../models/User'); // Import the User model

const router = express.Router();

// Route to get all users
router.get('/api/users', async (req, res) => {
    try {
        // Fetch all users from the database, selecting only the fields you want to expose
        const users = await User.find({}, 'email'); // This example only exposes the email field
        res.json(users); // Send the list of users back to the client
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users.' });
    }
});

module.exports = router;