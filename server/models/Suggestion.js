const mongoose = require('mongoose');
const { Schema } = mongoose;

const SuggestionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Suggestion must have a userID.'],
        },

        lensId: {
            type: Schema.Types.ObjectId,
            ref: 'Lens',
            required: [true, 'Suggestion must have a lensID.'],
        },
        category: {
            type: String,
            required: [true, 'Suggestion must have a category'],
        },

        suggestionText: {
            type: String,
            required: [true, 'Suggestion must have a text'],
            trim: true,
        },
        attachementUrl: {
            type: String,
            default: '',
        },

        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: { createdAt: true } }
);

const Suggestion = mongoose.model('Suggestion', SuggestionSchema);

module.exports = Suggestion;
