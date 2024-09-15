const express = require("express");
const { updateUser,getUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/protect");

const router = express.Router();

router.put("/",protect, updateUser);
router.get("/:id",protect, getUserProfile);

module.exports = router;
