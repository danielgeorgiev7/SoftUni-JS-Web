const Crypto = require("../models/Crypto");

exports.create = (data) => Crypto.create(data);

exports.getAll = () => Crypto.find();

exports.getOne = (postId, popOptions = '') => Crypto.findById(postId).populate(popOptions);

exports.updateOne = (postId, data) => Crypto.findByIdAndUpdate(postId, data, { runValidators: true });

exports.deleteOne = (postId) => Crypto.findByIdAndDelete(postId);