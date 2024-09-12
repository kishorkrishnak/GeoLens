const express = require("express");
const { updateUser } = require("../controllers/userController");
const { protect } = require("../middlewares/protect");

const router = express.Router();

router.put("/",protect, updateUser);

module.exports = router;
