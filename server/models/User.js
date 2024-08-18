const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name. Please provide name'],
      trim: true,
    },
    email: {
      type: String,
      required: [
        true,
        'Every User must have a unique Email. Please provide Email',
      ],
      unique: [true, 'Email already in use'],
      validate: [validator.isEmail, 'Invalid Email'],
      lowercase: true,
    },
    dateJoined: {
      type: Date,
      default: Date.now(),
    },
    image: {
      type: String,
    },

    lensesCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lens",

        index: true,
      },
    ],
    favoriteLenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lens",
        index: true,
      },
    ],
  },
  { timestamps: { createdAt: true } }

);

const User = mongoose.model('User', UserSchema);

module.exports = User;