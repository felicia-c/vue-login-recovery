const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Mot de passe ou e-mail invalide.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe ou e-mail invalide. !isMatch' });
        }

        // Create a token
        const JWT_SECRET = process.env.VUE_APP_JWT_SECRET;
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, email: user.email, username: user.username, profilePicture: user.profilePicture } });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer ultérieurement.' });
    }
});

module.exports = router;
