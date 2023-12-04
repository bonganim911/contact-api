const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constants.BAD_REQUEST_CODE:
            res.json({title: constants.BAD_REQUEST_TITLE, message: err.message})
            break
        case constants.UNAUTHORIZED_TITLE:
            res.json({title: constants.UNAUTHORIZED_TITLE, message: err.message})
            break
        case constants.FORBIDDEN_CODE:
            res.json({title: constants.FORBIDDEN_TITLE, message: err.message})
            break
        case constants.SERVER_ERROR_CODE:
            res.json({title: constants.SERVER_ERROR_TITLE, message: err.message})
            break
        default:
            console.log("There is not error, all good!")
            break
    }
}

module.exports = errorHandler
