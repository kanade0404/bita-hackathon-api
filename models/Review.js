const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: Number,
  storeId: Number,
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
