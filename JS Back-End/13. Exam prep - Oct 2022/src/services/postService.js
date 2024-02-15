const Animal = require("../models/Animal");

exports.getLast = (numPosts) => Animal.find().sort({ createdAt: -1 }).limit(numPosts);

