const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/vue-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Register Route
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ email, password: hashedPassword });
        res.json({ status: 'ok', user });
    } catch (error) {
        res.json({ status: 'error', error: 'Duplicate email' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid login' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign(
            { email: user.email },
            'secret123'
        );
        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
});

// Password Recovery Route
// (Implement logic for sending recovery email or resetting the password here)

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
