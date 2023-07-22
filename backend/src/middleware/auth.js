const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    try {
        // Verify the token and decode it to get the user ID
        const decodedToken = jwt.verify(token.split(' ')[1], 'secret-key');
        const userId = decodedToken.userId;

        // Attach the user information to the request object
        req.user = { userId };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

module.exports = authMiddleware;
