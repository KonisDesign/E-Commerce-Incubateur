const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    address: String,
    zip: String,
    city: String,
    country: String,
    orders: Array,
});

module.exports = mongoose.model('Users', UserSchema);