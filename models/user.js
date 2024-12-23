const db = require('../config/db'); // Database connection

const User = {
    create: async (user) => {
        return db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [user.username, user.email, user.password]
        );
    },
    findByEmail: (email) => db.query('SELECT * FROM users WHERE email = ?', [email]), // Find user by email
};

module.exports = User;
