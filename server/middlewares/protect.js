const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ status: 'error', message: 'No token provided', data: null });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Invalid token', data: null });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid token',
        });
    }
};
