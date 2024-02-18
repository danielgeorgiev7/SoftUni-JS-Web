const mongoose = require('mongoose');

const stoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    formula: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    likedList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

const Stone = mongoose.model('Stone', stoneSchema);

module.exports = Stone;