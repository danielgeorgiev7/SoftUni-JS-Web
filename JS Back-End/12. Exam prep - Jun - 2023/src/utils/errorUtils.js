const { MongooseError } = require('mongoose');

exports.getErrorMessage = (err) => {
    let message = '';
    if (err instanceof MongooseError && err.errors) {
        message = Object.values(err.errors)[0].message
    }
    else {
        message = err.message;
    }
    return message;
};
