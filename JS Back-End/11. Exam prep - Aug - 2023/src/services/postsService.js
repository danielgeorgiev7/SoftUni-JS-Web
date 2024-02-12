const Creature = require("../models/Creatures");

exports.getAll = async () => await Creature.find().lean();

exports.create = async (data) => await Creature.create(data);
