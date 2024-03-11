const Stone = require("../models/Stone");

exports.getLast = (numPosts) => Stone.find().sort({ createdAt: -1 }).limit(numPosts);

exports.create = (data) => Stone.create(data);

exports.getAll = () => Stone.find();

exports.getOne = (postId) => Stone.findById(postId);

exports.updateOne = (postId, data) => Stone.findByIdAndUpdate(postId, data, { runValidators: true });

exports.deleteOne = (postId) => Stone.findByIdAndDelete(postId);