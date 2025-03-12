const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // wrong mongodb id error
    if (err.name === 'CastError') {
        const message = "Resources not found with this id... Invalid " + err.path;
        err = new ErrorHandler(message, 400);

    }
    //duplicate key
    if (err.code === 11000) {
        const message = `Duplicate key ${err.keyValue} Entered`
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = "Your URL is invalid! Please try again later"
        err = new ErrorHandler(message, 400);
    }

    // jwt expired
    if (err.name === "TokenExpiredError") {
        const message = "Your URL has expired! Please try again later"
        err = new ErrorHandler(message, 401);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}