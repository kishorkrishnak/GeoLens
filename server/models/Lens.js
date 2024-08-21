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
        thumbnail: {
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

        address: {
            bounds: {
                type: Map,
                of: Schema.Types.Mixed,
                default: {}
            },

            formatted: {
                type: String,
                required: [true, 'Address must have a formatted string'],
            },
            components: {
                type: Map,
                of: Schema.Types.Mixed,
                default: {}
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
            default: 0, index: true,
        },

        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                index: true,
            },
        ],

    },
    { timestamps: { createdAt: true } }

);

LensSchema.index({ location: '2dsphere' });

LensSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
    try {
        const doc = await this.model.findOne(this.getFilter());
        if (doc && doc.markers && doc.markers.length > 0) {
            await mongoose.model('Marker').deleteMany({ _id: { $in: doc.markers } });
        }
        next();
    } catch (error) {
        next(error);
    }
});


const Lens = mongoose.model('Lens', LensSchema);




module.exports = Lens;