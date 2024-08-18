const mongoose = require('mongoose');
const { Schema } = mongoose

const MarkerSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Lens must have a title'],
            trim: true,
        },

        description: {
            type: String,
        },

        category: {
            type: String,
        },
        image: {
            type: String,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },

        upvotes: {
            type: Number,
            default: 0
        },

        downvotes: {
            type: Number,
            default: 0
        },
    },
    { timestamps: { createdAt: true } }

);

const Marker = mongoose.model('Marker', MarkerSchema);

module.exports = Marker;