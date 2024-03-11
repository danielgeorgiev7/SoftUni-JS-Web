const fs = require('fs');

const readStream = fs.createReadStream("./data/input.txt", { encoding: 'utf8', highWaterMark: 1000 });
const writeStream = fs.createWriteStream("./data/copy.txt", { encoding: 'utf8' });

readStream.pipe(writeStream);