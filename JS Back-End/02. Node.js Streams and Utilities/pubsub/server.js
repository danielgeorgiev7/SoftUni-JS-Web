const http = require('http');
const messageBroker = require('./messageBroker');

require('./logger');
require('./reportingService');


const server = http.createServer((req, res) => {
    messageBroker.publish('request', `URL: ${req.url}; METHOD: ${req.method}`);

    res.end();

});

server.listen(5000);
console.log('Server is listening on port 5000')