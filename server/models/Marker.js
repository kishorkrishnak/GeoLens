const mongoose = require("mongoose");
const { Schema } = mongoose;

const MarkerSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Lens must have a title"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Lens must have a description"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Lens must have a category"],
    },

    image: {
      type: String,
    },

    address: {
      formatted: {
        type: String,
        required: [true, "Address must have a formatted string"],
      },
      components: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {},
      },
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],

    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
  },
  { timestamps: { createdAt: true } }
);

const Marker = mongoose.model("Marker", MarkerSchema);

module.exports = Marker;
