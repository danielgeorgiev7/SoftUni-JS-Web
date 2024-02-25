const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    description: String,
    price: Number,
    img: String,
    material: String,
});

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture;