const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;