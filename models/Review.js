const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: String,
  storeId: String,
  content: String
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
