const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  name: String,
  name_joint: String,
  price: Number,
  cat: String,
  gender: String,
});

module.exports = mongoose.model('Shoes', shoeSchema);