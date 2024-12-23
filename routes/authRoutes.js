const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Your user model

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        await User.create({ username, email, password: hashedPassword }); // Save hashed password
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(`Error during registration: ${err.message}`);
        res.status(500).send(err.message);
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(`Login attempt for email: ${email}`); // Log email

        const [users] = await User.findByEmail(email); // Find the user by email
        console.log(`User data retrieved: ${JSON.stringify(users)}`); // Log retrieved user data

        if (users.length === 0) {
            console.log('No user found with this email');
            return res.status(401).send('Invalid credentials');
        }

        const user = users[0];
        console.log(`Password entered: ${password}`);
        console.log(`Password stored in DB: ${user.password}`);

        const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
        console.log(`Password match result: ${isMatch}`);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' }); // Generate JWT
        console.log(`Generated token: ${token}`);
        res.json({ token });
    } catch (err) {
        console.error(`Error during login: ${err.message}`);
        res.status(500).send(err.message);
    }
});

module.exports = router;
