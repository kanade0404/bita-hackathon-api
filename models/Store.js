const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  address: String,
  lat: Number,
  lon: Number
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
