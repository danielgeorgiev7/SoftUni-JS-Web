const Animal = require("../models/Animal");

exports.getLast = (numPosts) => Animal.find().sort({ createdAt: -1 }).limit(numPosts);

exports.create = (data) => Animal.create(data);

exports.getAll = () => Animal.find();

exports.getOne = (postId, popOptions = '') => Animal.findById(postId).populate(popOptions);

exports.updateOne = (postId, data) => Animal.findByIdAndUpdate(postId, data, { runValidators: true });

exports.deleteOne = (postId) => Animal.findByIdAndDelete(postId);