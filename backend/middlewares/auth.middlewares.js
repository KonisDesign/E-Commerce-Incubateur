const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;