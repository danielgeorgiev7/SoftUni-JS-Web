const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;