const Lens = require("../models/Lens");
const Marker = require("../models/Marker");

exports.createMarker = async (req, res, next) => {
  try {
    const { lensId, location, title, description, category, image, address } =
      req.body;
    if (!lensId || !title || !category) {
      return res.status(400).json({
        status: "error",
        message: "LensID, title, location and creator are required fields",
        data: null,
      });
    }

    const newMarker = new Marker({
      title,
      description,
      location,
      category,
      image,
      address: {
        formatted: address?.formatted || "",
        //store all the address components as an object
        components: address?.components || {},
      },
    });

    await newMarker.save();
    const lens = await Lens.findById(lensId);

    if (!lens) {
      return res.status(404).json({
        status: "error",
        message: "Invalid lens id",
        data: null,
      });
    }

    lens.markers.push(newMarker._id);

    await lens.save();

    const markerData = newMarker.toObject();
    markerData.location.coordinates.reverse();

    res.status(200).json({
      status: "success",
      data: markerData,
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

exports.getMarker = async (req, res, next) => {
  try {
    const { id } = req.params;

    const marker = await Marker.findById(id);

    if (!marker) {
      return res.status(404).json({
        status: "error",
        message: "Invalid lens id",
        data: null,
      });
    }
    marker.location.coordinates = marker.location.coordinates.reverse();

    res.status(200).json({
      status: "success",
      data: marker,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

exports.updateMarker = async (req, res, next) => {
  try {
    const markerId = req.params.id;
    const updatedMarkerDetails = req.body;

    const updatedMarker = await Marker.findByIdAndUpdate(
      markerId,
      updatedMarkerDetails,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMarker) {
      return res.status(404).json({
        status: "error",
        message: "Marker not found",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Marker updated successfully",
      data: updatedMarker,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

exports.deleteMarker = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Marker.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Marker deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

exports.likeMarker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const marker = await Marker.findById(id);

    if (!marker) {
      return res.status(404).json({
        status: "error",
        message: "Invalid marker id",
        data: null,
      });
    }
    if (marker.likes.includes(userId)) {
      return res.status(409).json({
        status: "error",
        message: "You have already liked this marker",
        data: null,
      });
    }

    marker.likes.push(userId);

    await marker.save();

   const updatedMarker =   await Marker.findByIdAndUpdate(
      id,
      { $pull: { dislikes: userId } },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      message: "Marker liked succesfully",
      data: updatedMarker,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

exports.dislikeMarker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const marker = await Marker.findById(id);

    if (!marker) {
      return res.status(404).json({
        status: "error",
        message: "Invalid marker id",
        data: null,
      });
    }
    if (marker.dislikes.includes(userId)) {
      return res.status(404).json({
        status: "error",
        message: "You have already disliked this marker",
        data: null,
      });
    }
    marker.dislikes.push(userId);

    await marker.save();
    const updatedMarker = await Marker.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      message: "Marker disliked succesfully",
      data: updatedMarker ,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};
