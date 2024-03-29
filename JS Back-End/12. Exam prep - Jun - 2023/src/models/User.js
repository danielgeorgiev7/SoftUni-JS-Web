const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//TODO Change parameters

const userSchema = new mongoose.Schema({
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

// userSchema.virtual('rePassword')
//     .set(function (value) {
//         if (value !== this.password) {
//             throw new Error('Passwords does not match');
//         }
//     });

const User = mongoose.model('User', userSchema);

module.exports = User;