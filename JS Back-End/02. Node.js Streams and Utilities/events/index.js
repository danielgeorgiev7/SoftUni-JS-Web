const events = require('events');

const eventEmitter = new events.EventEmitter();

eventEmitter.on('request', (eventData) => {
    console.log(`On request - ${eventData}`);
});

eventEmitter.emit('request', 'Request emitted');