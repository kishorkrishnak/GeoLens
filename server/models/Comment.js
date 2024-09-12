const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must have a userID."],
    },

    body: {
      type: String,
      required: [true, "Lens must have a comment"],
      trim: true,
    },
  },
  { timestamps: { createdAt: true } }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
