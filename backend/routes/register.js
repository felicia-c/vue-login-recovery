const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/api/register', async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingEmail) {
            return res.status(400).json({ message: 'Cet Email est déjà utilisé.' });
        }

        if (existingUsername) {
            return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà utilisé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save();

        res.status(201).json({ message: 'Inscription réussie !' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
    }
});

module.exports = router;
