const mongoose = require('mongoose');
const { Schema } = mongoose
const LensSchema = new Schema(

    {
        name: {
            type: String,
            required: [true, 'Lens must have a title.'],
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

        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Lens must have a creator.'],
        },

        views: {
            type: Number,
            default: 0
        },

        likes: {
            type: Number,
            default: 0
        },

    },
    { timestamps: { createdAt: true } }

);

const Lens = mongoose.model('Lens', LensSchema);
LensSchema.index({ location: '2dsphere' });
LensSchema.pre('remove', async function (next) {
    try {
        await mongoose.model('Marker').deleteMany({ _id: { $in: this.markers } });
        next();
    } catch (error) {
        next(error);
    }
});
module.exports = Lens;