const express = require('express');

const { getLens,getLensCenterCoordinates, getLenses, createLens, deleteLens, updateLens } = require('../controllers/lensController');
const router = express.Router();

router.get('/', getLenses);
router.post('/', createLens);
router.put('/:id', updateLens);
router.get('/:id', getLens);
router.delete('/:id', deleteLens);
router.get('/:id/center',getLensCenterCoordinates);
module.exports = router;
