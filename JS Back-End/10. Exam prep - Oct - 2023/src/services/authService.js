const User = require('../models/User');
const bcrypt = require('bcrypt');
const SECRET = require('../config/config');

// TODO Double check each

exports.register = async (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Passwords do not match');
    }

    const user = await User.findOne({ email: userData.email });
    if (user) {
        throw new Error('User already exists');
    }

    const createdUser = await User.create(userData);

    const token = await generateToken(createdUser);
    return token;
}

exports.login = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
        throw new Error('Email or password is invalid');
    };

    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Email or password is invalid');
    }

    // Generate token
    const token = await generateToken(user);
    return token;
};

function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    return jwt.sign(payload, SECRET, { expiresIn: '2h' });
}