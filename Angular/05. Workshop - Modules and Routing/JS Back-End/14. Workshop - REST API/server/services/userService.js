const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (userData) => {
    const user = await User.create(userData);

    return generateAccessToken(user);
}

exports.login = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error('No such user');
    }

    const isValid = await bcrypt.compare(userData.password, user.password);
    if (!isValid) {
        throw new Error('No such user');
    }

    return generateAccessToken(user);
};

function generateAccessToken(user) {
    const accessToken = jwt.sign({
        _id: user._id,
        email: user.email
    }, 'somesecrethere');

    return {
        _id: user._id,
        email: user.email,
        accessToken
    }
}