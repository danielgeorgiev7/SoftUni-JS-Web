const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    payment: {
        type: String,
        required: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
    },
    buyerList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;