const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    years: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    kind: {
        type: String,
        required: true,
        minlength: 3
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    need: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    location: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
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