const mongoose = require('mongoose');
const User = require('./User');

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name must be at least 2 characters long'],
    },
    species: {
        type: String,
        required: true,
        minLength: [3, 'Species be at least 3 characters long'],
    },
    skinColor: {
        type: String,
        required: true,
        minLength: [3, 'Skin color be at least 3 characters long'],
    },
    eyeColor: {
        type: String,
        required: true,
        minLength: [3, 'Eye color be at least 3 characters long'],
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    description: {
        type: String,
        required: true,
        minLength: [5, 'Description be at least 5 characters long'],
        maxLength: [500, 'Description must be not more than 500 characters long'],
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;