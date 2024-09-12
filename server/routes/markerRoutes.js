const express = require("express");

const {
  getMarker,
  createMarker,
  deleteMarker,
  updateMarker,
  likeMarker,
  dislikeMarker,
} = require("../controllers/markerController");
const { protect } = require("../middlewares/protect");
const router = express.Router();

router.get("/:id", getMarker);
router.post("/", protect, createMarker);
router.put("/:id", protect, updateMarker);
router.delete("/:id", protect, deleteMarker);
router.post("/:id/like", protect, likeMarker);
router.delete("/:id/like", protect, dislikeMarker);
module.exports = router;
