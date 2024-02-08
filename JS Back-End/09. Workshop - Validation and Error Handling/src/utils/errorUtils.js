const { MongooseError } = require('mongoose');

exports.getErrorMessage = (err) => {
    let message = '';
    if (err instanceof MongooseError) {
        message = Object.values(err.errors)[0].message
    }
    else if (err instanceof Error) {
        err.message = message;
    }
    return message;
};
