const Lens = require("../models/Lens");
const User = require("../models/User");

exports.createLens = async (req, res, next) => {
  try {
    const { name, thumbnail, description, location, tags, creator } = req.body;
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
      thumbnail,
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
  const {
    creatorId,
    country,
    state,
    sort,
    filter,
    search,
    page = 1,
    limit = 10,
    clientGeoCoordinates
  } = req.query;

  let sortStage = {};
  let matchStage = {};

  if (sort === "latest") {
    sortStage = { createdAt: -1 };
  } else if (sort === "oldest") {
    sortStage = { createdAt: 1 };
  } else if (sort === "popular") {
    sortStage = { views: -1, likes: -1, createdAt: -1 };
  }

  if (country) matchStage.country = country;
  if (state) matchStage.state = state;
  if (creatorId) matchStage.creator = creatorId;

  const searchConditions = [];
  if (search) {
    const regex = new RegExp(search, "i");
    searchConditions.push(
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      // { state: { $regex: regex } },  // Uncomment if needed
      // { district: { $regex: regex } },  // Uncomment if needed
      { tags: { $elemMatch: { $regex: regex } } }
    );
  }

  if (searchConditions.length > 0) {
    matchStage.$and = matchStage.$and || [];
    matchStage.$and.push({ $or: searchConditions });
  }

  const collation = { locale: "en", strength: 2 };

  try {
    const skip = (page - 1) * limit;

    const lenses = await Lens.find(matchStage)
      .collation(collation)
      .sort(sortStage)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("markers")
      .populate("creator");

    const totalLenses = await Lens.countDocuments(matchStage);

    res.status(200).json({
      status: "success",
      message: "Lenses retrieved successfully",
      data: lenses,
      total: totalLenses,
      page,
      limit,
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
