const express = require('express');

const { getMarker, createMarker, deleteMarker, updateMarker } = require('../controllers/markerController');
const router = express.Router();

router.get('/:id', getMarker);
router.post('/', createMarker);
router.put('/:id', updateMarker);
router.delete('/:id', deleteMarker);

module.exports = router;
