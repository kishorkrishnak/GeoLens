const express = require('express');

const { createLens } = require('../controllers/lensController');
const router = express.Router();


router.post('/', createLens);

module.exports = router;
