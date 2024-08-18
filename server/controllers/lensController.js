const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const oauth2Client = require('../utils/oauth2client');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};

const createSendToken = (user, res) => {
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
    };

    res.cookie('jwt', token, cookieOptions);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

exports.googleAuth = async (req, res, next) => {
    try {
        const code = req.query.code;

        const googleRes = await oauth2Client.oauth2Client.getToken(code);
        oauth2Client.oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        let user = await User.findOne({ email: userRes.data.email });

        if (!user) {
            user = await User.create({
                name: userRes.data.name,
                email: userRes.data.email,
                image: userRes.data.picture,
            });
        }

        createSendToken(user, res);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: "Internal server error",
            data: null
        });
    }
};

exports.verifyToken = async (req, res) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ status: 'error', message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Invalid token' });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid token',
        });
    }
};

exports.logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
    });

    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
    });
};