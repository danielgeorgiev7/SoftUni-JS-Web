const Item = require("../models/Item");

exports.search = (name, type) => {
    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    }

    if (type) {
        query.type = new RegExp(type, 'i');
    }

    return Item.find(query);
}