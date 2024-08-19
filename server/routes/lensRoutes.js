const express = require('express');

const { getLens, getLenses, createLens } = require('../controllers/lensController');
const router = express.Router();

router.get('/', getLenses);
router.post('/', createLens);
router.get('/:id', getLens);

module.exports = router;
