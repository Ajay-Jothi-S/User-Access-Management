const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Not authorized' });
    }
};

const roleMiddleware = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: 'Access forbidden' });
    next();
};

module.exports = { authMiddleware, roleMiddleware };
