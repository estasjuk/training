const {isValidObjectId} = require("mongoose");

const HttpError = require("../helpers/HttpError");

const isValidSprintId = (req, res, next) => {
    const {sprintId} = req.params;
    if(!isValidObjectId(sprintId)) {
        next(new HttpError(404, `${sprintId} invalid format`))
    }

    next();
}

module.exports = isValidSprintId;