const { default: mongoose } = require("mongoose");
const Item = require("../models/Item");

exports.create = async (itemData) => {
    try {
        await Item.create(itemData);
    }
    catch (err) {
        console.log(err);
        res.redirect('/catalog/create');
    }
};