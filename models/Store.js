const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
