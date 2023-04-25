const { Sprint } = require('../models/sprints');

// const HttpError = require('../helpers/HttpError');

const { controllerWrapper } = require('../utils/contollerWrapper');

const addSprint = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { projectId: project } = req.params;
    const result = await Sprint.create({ ...req.body, owner, project});
    res.status(201).json({
        status: 'success',
        code: 201,
        result,
    });
};

module.exports = {
    addSprint: controllerWrapper(addSprint),
}