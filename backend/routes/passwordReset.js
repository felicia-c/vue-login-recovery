const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

// Load environment variables from .env file (if using dotenv)
require('dotenv').config();

// Route to request a password reset
router.post('/api/request-password-reset', async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No account with that email exists.' });
        }

        // Generate a reset token and set expiration
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

        await user.save();
        const AUTH_EMAIL = process.env.YOUR_EMAIL;
        const AUTH_PWD = process.env.YOUR_EMAIL_PWD;
        const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'Gmail';
        // Send email with token
        const transporter = nodemailer.createTransport({
            service: EMAIL_SERVICE,
            auth: {
                user: AUTH_EMAIL,
                pass: AUTH_PWD,
            },
        });

        const mailOptions = {
            to: user.email,
            from: 'felicia.cuneo@gmail.com',
            subject: 'Password Reset',
            text: `Vous recevez cet e-mail parce que vous (ou quelqu'un d'autre) avez demandé à réinitialiser votre mot de passe.\n\n
            Veuillez cliquer sur le lien suivant, ou bien le coller dans votre navigateur pour terminer la procédure de récupération :\n\n
            http://localhost:8080/reset/${token}\n\n
            Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet e-mail, votre mot de passe restera inchangé.\n`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Un e-mail à été envoyé à ' + user.email + ' avec la procédure à suivre.' });
    } catch (error) {
        console.error('Error in request-password-reset route:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi de l\'e-mail de récupération.' });
    }
});

// Route to reset the password using the token
router.post('/api/reset-password/:token', async (req, res) => {
    try {
        // Find the user by the reset token and check if it's still valid
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if the token has not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        // Set the new password
        user.password = req.body.password;
        // Clear the reset token and expiration
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: 'Password has been successfully reset.' });
    } catch (error) {
        console.error('Error in reset-password route:', error);
        res.status(500).json({ message: 'An error occurred while resetting your password.' });
    }
});

module.exports = router;