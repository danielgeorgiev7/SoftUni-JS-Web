const Creature = require("../models/Creatures")

exports.getUserPosts = async (userId, path = '', select = '') => {
    return Creature.find({ owner: userId }).populate({ path, select }).lean()
};