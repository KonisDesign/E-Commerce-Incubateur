const authenticateJWT = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.user = user;
        next();
    });
};