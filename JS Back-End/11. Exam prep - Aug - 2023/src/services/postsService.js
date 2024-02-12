const Creature = require("../models/Creatures");

exports.create = async (data) => await Creature.create(data);

exports.getAll = async () => await Creature.find().lean();

exports.getOne = async (postId, popOptions1 = '', popOptions2 = '') => await Creature.findById(postId).populate(popOptions1).populate(popOptions2).lean();

exports.updateOne = async (postId, data) => await Creature.findByIdAndUpdate(postId, data).lean();

exports.deleteOne = async (postId) => await Creature.findByIdAndDelete(postId).lean();
