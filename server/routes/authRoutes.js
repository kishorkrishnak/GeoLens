const express = require('express');
const { googleAuth, verifyToken, logoutUser } = require('../controllers/authController');
const router = express.Router();

router.get('/google', googleAuth);
router.get('/verify', verifyToken);
router.post('/logout', logoutUser);

module.exports = router;
