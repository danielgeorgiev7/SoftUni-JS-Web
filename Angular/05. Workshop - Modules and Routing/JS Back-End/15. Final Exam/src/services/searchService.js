const Stone = require("../models/Stone");

exports.search = (name) => {
    let query = {};

    if (Stone.name) {
        query.name = new RegExp(name, 'i');
    }

    return Stone.find(query);
}