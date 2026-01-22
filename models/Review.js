// Review is embedded in Product schema as per common Mongoose patterns for sub-documents.
// However, creating a standalone file for reference or if we switch to normalized schema.

const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        }
    },
    {
        timestamps: true,
    }
);

// const Review = mongoose.model('Review', reviewSchema);
// module.exports = Review;

module.exports = reviewSchema;
