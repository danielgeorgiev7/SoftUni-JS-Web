const messageBroker = require('./messageBroker');

messageBroker.subscribe('request', logger);

function logger(message) {
    console.log(`Logger: ${message}`);
}
module.exports = logger;