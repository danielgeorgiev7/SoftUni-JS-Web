const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    years: {
        type: Number,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    need: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;