const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Passwords do not match');
    }

    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('User already exists');
    }

    return User.create(userData);
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

};