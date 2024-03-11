const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        minLength: [10, 'The name must be at least 10 characters.'],
    },
    type: {
        type: String,
        required: [true, 'Type field is required'],
        minLength: [2, 'The type must be at least 2 characters.'],
    },
    damages: {
        type: String,
        required: [true, 'Damages field is required'],
        minLength: [10, 'The damages must be at least 10 characters.'],
    },
    image: {
        type: String,
        required: [true, 'Image field is required'],
        match: /^https?:\/\//
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
        minLength: [10, 'The description must be at least 10 characters.'],
        maxLength: [200, 'The description must be less than 200 characters.'],
    },
    production: {
        type: Number,
        required: [true, 'Production field is required'],
        min: [1900, 'The production year must be after 1900.'],
        max: [2023, 'The production year must be before 2023.'],
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation field is required'],
        min: [1, 'The exploitation must be a positive number.'],
    },
    price: {
        type: Number,
        required: [true, 'Price field is required'],
        min: [1, 'The price must be a positive number.'],
    },
    buyingList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
