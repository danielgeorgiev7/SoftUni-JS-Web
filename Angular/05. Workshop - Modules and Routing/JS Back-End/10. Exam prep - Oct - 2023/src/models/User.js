const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username field cannot be empty.'],
        minlength: [3, 'The username must be at least 3 characters.'],
    },
    email: {
        type: String,
        required: [true, 'Email field cannot be empty.'],
        unique: [true, 'Email is already taken.'],
        minlength: [10, 'The email must be at least 10 characters.'],
    },
    password: {
        type: String,
        required: [true, 'Password field cannot be empty.'],
        minlength: [4, 'The password must be at least 4 characters.'],
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

// userSchema.virtual('rePassword')
//     .set(function (value) {
//         if (value !== this.password) {
//             throw new Error('Passwords does not match');
//         }
//     });

const User = mongoose.model('User', userSchema);

module.exports = User;