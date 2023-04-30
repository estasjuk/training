const {isValidObjectId} = require("mongoose");

const HttpError = require("../helpers/HttpError");

const isValidProjectId = (req, res, next) => {
    const {projectId} = req.params;
    if(!isValidObjectId(projectId)) {
        next(new HttpError(404, `${projectId} invalid format`))
    }

    next();
}

module.exports = isValidProjectId;