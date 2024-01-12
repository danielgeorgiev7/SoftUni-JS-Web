const fs = require('fs');
const { EOL } = require('os')

const readStream = fs.createReadStream("./data/input.txt", { encoding: 'utf8', highWaterMark: 1000 });
const writeStream = fs.createWriteStream("./data/copy.txt", { encoding: 'utf8' });

readStream.on('data', (chunk) => {
    writeStream.write('---- NEW CHUNK ----' + EOL);
    writeStream.write(chunk);
    writeStream.write(EOL);
});

readStream.on('close', () => {
    writeStream.end();
});