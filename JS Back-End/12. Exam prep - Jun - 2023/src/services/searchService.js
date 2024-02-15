const Animal = require("../models/Animal");

exports.search = (location) => {
    let query = {};

    if (location) {
        query.location = new RegExp(location, 'i');
    }

    return Animal.find(query);
}