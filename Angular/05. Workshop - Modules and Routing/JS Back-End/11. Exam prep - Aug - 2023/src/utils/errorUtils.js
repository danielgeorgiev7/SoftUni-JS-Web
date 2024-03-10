const { MongooseError } = require('mongoose');

exports.getErrorMessage = (err) => {
    let message = '';
    if (err instanceof MongooseError) {
        message = Object.values(err.errors).at(0).message
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    return message;
};
