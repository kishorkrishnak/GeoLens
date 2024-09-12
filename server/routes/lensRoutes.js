const express = require("express");

const {
  getLens,
  getLensCenterCoordinates,
  getLenses,
  createLens,
  deleteLens,
  updateLens,
  addCommentToLens,
  deleteCommentFromLens,
  getCommentsForLens,
  createSuggestion,
  getSuggestionsForLens,
  deleteSuggestionFromLens,
  likeLens,
  dislikeLens,
  markSuggestionAsRead,
  updateSuggestion,
} = require("../controllers/lensController");
const { protect } = require("../middlewares/protect");

const router = express.Router();

router.get("/", getLenses);
router.post("/", protect, createLens);
router.put("/:id", protect, updateLens);
router.get("/:id", getLens);
router.get("/:id/center", getLensCenterCoordinates);
router.delete("/:id", protect, deleteLens);
router.post("/:id/comments", protect, addCommentToLens);
router.delete("/:id/comments/:commentId", protect, deleteCommentFromLens);
router.get("/:id/comments", getCommentsForLens);
router.post("/:id/suggestion", protect, createSuggestion);
router.get("/:id/suggestion", getSuggestionsForLens);
router.delete(
  "/:id/suggestion/:suggestionId",
  protect,
  deleteSuggestionFromLens
);
router.put("/:id/suggestion/:suggestionId", protect, updateSuggestion);
router.post("/:id/like", protect, likeLens);
router.delete("/:id/like", protect, dislikeLens);

module.exports = router;
