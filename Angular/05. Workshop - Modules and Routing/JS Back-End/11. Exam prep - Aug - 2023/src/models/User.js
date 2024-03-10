const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'First name must be at least 3 characters long'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'Last name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [10, 'Email must be at least 10 characters long'],
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Password must be at least 4 characters long'],
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