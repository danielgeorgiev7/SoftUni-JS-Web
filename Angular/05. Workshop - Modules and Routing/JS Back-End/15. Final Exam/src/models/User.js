const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email field is required.'],
        unique: true,
        minlength: [10, 'Email length must be at least 10 characters.'],
    },
    password: {
        type: String,
        required: [true, 'Password field is required.'],
        minlength: [4, 'Password length must be at least 4 characters.']
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;