
const express = require('express');

const {
    getLens,
    getLensCenterCoordinates,
    getLenses,
    createLens,
    deleteLens,
    updateLens,
    addCommentToLens,
    deleteCommentFromLens,
    getCommentsForLens
} = require('../controllers/lensController');

const router = express.Router();

router.get('/', getLenses);
router.post('/', createLens);
router.put('/:id', updateLens);
router.get('/:id', getLens);
router.get('/:id/center', getLensCenterCoordinates);
router.delete('/:id', deleteLens);
router.post('/:id/comments', addCommentToLens);
router.delete('/:id/comments/:commentId', deleteCommentFromLens);
router.get('/:id/comments', getCommentsForLens);

module.exports = router;
