const User = require("../models/User");

exports.updateUser = async (req, res, next) => {
  const userData = req.body;

  console.log(userData);
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Invalid user",
        data: null,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};
