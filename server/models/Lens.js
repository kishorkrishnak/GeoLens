const mongoose = require('mongoose');
const { Schema } = mongoose
const LensSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Lens must have a name. Please provide name'],
            trim: true,
        },

        description: {
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
        
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Lens must have a creator. Please provide the creator'],
        },

        image: {
            type: String,
        },

        views: {
            type: Number,
            default: 0
        },

        favorites: {
            type: Number,
            default: 0
        },

        likes: {
            type: Number,
            default: 0
        },

        markers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Marker",
                index: true,
            },
        ],
        tags: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            enum: ['active', 'inactive', 'deleted'],
            default: 'active'
        },

        visibility: {
            type: String,
            enum: ['public', 'private'],
            default: 'public'
        },

    },
    { timestamps: { createdAt: true } }

);

const Lens = mongoose.model('Lens', LensSchema);
LensSchema.index({ location: '2dsphere' });

module.exports = Lens;