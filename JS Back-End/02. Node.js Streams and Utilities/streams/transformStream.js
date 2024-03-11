const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream("./data/input.txt", { encoding: 'utf8', highWaterMark: 1000 });
const writeStream = fs.createWriteStream("./data/transformed.txt", { encoding: 'utf8' });

const gzipTransformStream = zlib.createGzip();

readStream.pipe(gzipTransformStream).pipe(writeStream);