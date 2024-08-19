const Lens = require("../models/Lens");
const User = require("../models/User");

exports.createLens = async (req, res, next) => {
  try {
    const { name, description, location, tags, creator } = req.body;
    if (!name || !location || !creator) {
      return res.status(400).json({
        status: "error",
        message: "Name, location, and creator are required fields",
        data: null,
      });
    }

    const newLens = await Lens.create({
      name,
      description,
      location,
      tags,
      creator,
    });

    const lensCreator = await User.findById(creator);

    if (!lensCreator) {
      return res.status(404).json({
        status: "error",
        message: "Invalid user id",
        data: null,
      });
    }

    lensCreator.lensesCreated.push(newLens._id);

    await lensCreator.save();

    res.status(201).json({
      status: "success",
      data: newLens,
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

exports.getLens = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lens = await Lens.findById(id)
      .populate("markers")
      .populate("creator");

    if (!lens) {
      return res.status(404).json({
        status: "error",
        message: "Invalid lens id",
        data: null,
      });
    }

    res.status(201).json({
      status: "success",
      data: lens,
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

exports.getLenses = async (req, res, next) => {
    try {
      const lenses = await Lens.find({}).populate("markers").populate("creator")
  
      res.status(201).json({
        status: "success",
        message:"Lenses retrieved successfully",
        data: lenses,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        data: null,
      });
    }
  };

exports.deleteLens = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lens = await Lens.findById(id);

    if (!lens) {
      return res.status(404).json({
        status: "error",
        message: "Invalid lens id",
        data: null,
      });
    }

    await lens.remove();
    res.status(201).json({
      status: "success",
      message: "Lens deleted successfully",
      data: null,
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
