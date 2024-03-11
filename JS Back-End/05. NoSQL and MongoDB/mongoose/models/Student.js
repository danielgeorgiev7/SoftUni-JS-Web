const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    age: {
        type: Number,
        required: true,
        min: [12, 'Minimum age allowed is 12 years old!'],
        max: [120, 'Maximum age allowed is 120 years old!']
    }
});

studentSchema.methods.logInfo = function () {
    console.log(`Hello, I'm ${this.name}. And I'm ${this.age} years old.`);
}

studentSchema.virtual('description').get(function () {
    return `Name: ${this.name}, Age ${this.age}`;
})

// studentSchema.path('age')
//     .validate(function () {
//         return this.age > 0 && this.age < 120;
//     }, `Age should be between 0 and 120 years!`);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;