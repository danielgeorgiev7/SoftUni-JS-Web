const mongoose = require('mongoose');
const Student = require('./models/Student');

mongoose.connect(`mongodb://localhost:27017/test1`)
    .then(() => console.log('DB connection established'));

// const student = new Student({
//     age: 17,
//     name: 'Stamat'
// });
// student.save()
//     .then(createdStudent => {
//         console.log(createdStudent);
//     });

// Student.create({
//     name: 'Mariyka',
//     age: 19,
// }).then(data => console.log(data));

Student.find()
    .then(students => {
        students.forEach(student => student.logInfo());
    });

Student.find({ age: { $gte: 17 } })
    .then(result => result.forEach(student => console.log(student.description)))

Student.findOne({ name: { $in: ['NotStamat', 'Mariyka'] } })
    .then(student => console.log('findOne: ', student));

Student.findById('65b45b9be6c3e60f99491d5d')
    .then(result => {
        console.log('findById: ', result)
    });


// Student.updateOne({ age: 17 }, { $set: { age: 18 } })
//     .then(result => console.log('updateOne: ', result));

// Student.updateMany({ age: 17 }, { $set: { age: 16 } })
//     .then(result => console.log('updateMany: ', result));

// Student.findByIdAndUpdate('65b45c2d8287a969af20d905', { $set: { age: 18 } })
//     .then(result => {
//         console.log('findByIdAndUpdate: ', result);
//     });


// Student.findByIdAndDelete('id')
//     .then(result => console.log('findByIdAndDelete: ', result));

// Student.deleteOne({ name: 'NotStamat' })
//     .then(result => console.log('deleteOne: ', result));

// Student.deleteMany({ _id: { $in: ['id1', 'id2'] } })
//     .then(result => console.log('deleteMany: ', result));




