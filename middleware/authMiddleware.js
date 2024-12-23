const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the header
    if (!token) return res.status(401).send('Access denied'); // If no token, return "Access denied"

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // Verify the token
        req.user = decoded; // Attach user info to the request
        next(); // Continue to the next middleware
    } catch (err) {
        res.status(400).send('Invalid token'); // If token is invalid, return an error
    }
};

module.exports = authenticate;
