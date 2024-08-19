const express = require('express');

const { getMarker, createMarker, deleteMarker, updateMarker } = require('../controllers/markerController');
const router = express.Router();

router.post('/', createMarker);
router.get('/:id', getMarker);
router.delete('/:id', deleteMarker);
router.put('/:id', updateMarker);

module.exports = router;
