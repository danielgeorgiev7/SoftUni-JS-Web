const mongoose = require('mongoose');

const stoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.'],
        minlength: [2, 'Name must be at least 2 characters.']
    },
    category: {
        type: String,
        required: [true, 'Category field is required.'],
        minlength: [3, 'Category must be at least 3 characters.']
    },
    color: {
        type: String,
        required: [true, 'Color field is required.'],
        minlength: [2, 'Color must be at least 2 characters.']
    },
    image: {
        type: String,
        required: [true, 'Image field is required.'],
        match: [/^https?:\/\//, 'Image link is not valid'],
    },
    location: {
        type: String,
        required: [true, 'Location field is required.'],
        minlength: [5, 'Location must be at least 5 characters.'],
        maxlength: [15, 'Location must not be more than 15 characters.']
    },
    formula: {
        type: String,
        required: [true, 'Formula field is required.'],
        minlength: [3, 'Formula must be at least 3 characters.'],
        maxlength: [30, 'Formula must not be more than 30 characters.']
    },
    description: {
        type: String,
        required: [true, 'Description field is required.'],
        minlength: [10, 'Description must be at least 10 characters.']
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