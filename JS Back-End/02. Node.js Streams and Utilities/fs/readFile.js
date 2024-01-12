// const fs = require('fs');
const fs = require('fs/promises');

// SYNC
// console.log(1);
// const text = fs.readFileSync('./data.txt', { encoding: 'utf8' });
// console.log(2);
// console.log(text);
// console.log(3);

// ASYNC with  callback
// console.log(1);
// const text = fs.readFile('./data.txt', { encoding: 'utf8' }, (error, result) => {
//     if (error) {
//         console.log('There is a problem with the file system!');
//         return;
//     }
//     console.log(2);
//     console.log(result);
// });

// console.log(3);

// ASYNC with promises
fs.readFile('./data.txt', { encoding: 'utf8' })
    .then(result => {
        console.log(result);
    }).catch(err => {
        console.log('There is a problem with the file system!');
    });