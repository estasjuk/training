const { Sprint } = require('../models/sprints');
const { Task } = require('../models/tasks');

const HttpError = require('../helpers/HttpError');

const { controllerWrapper } = require('../utils/contollerWrapper');

const getSprintById = async (req, res) => {
  const { _id: owner } = req.user;
  const { sprintId, projectId: project } = req.params;
  const sprint = await Sprint.findById(sprintId);
  if (!sprint) {
    throw new HttpError(404, 'Sprint not found');
  };

  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  const listOfTasks = await Task.find(
        { owner, project, sprint },
        "-createdAt -updatedAt",
        { skip, limit })
        .populate("owner", "email");
  
  res.json({
    status: 'success',
    code: 200,
    data: {
      sprint,
      listOfTasks,
    },
  });
};


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

const updateSprintName = async (req, res, next) => {
    const { sprintId } = req.params;
    const result = await Sprint.findByIdAndUpdate(sprintId, req.body, { new: true });
    if (!result) {
        throw new HttpError(404, 'Sprint not found');
    }
    res.status(201).json({
        status: 'success',
        code: 201,
        result,
    });
};

const removeSprint = async (req, res, next) => {
    const { sprintId } = req.params;
    const result = await Sprint.findByIdAndDelete(sprintId, req.body);
    if (!result) {
        throw new HttpError(404, 'Sprint not found');
    }
    res.status(200).json({
        status: 'success',
        code: 200,
        data: {
            message: "Sprint deleted",
            result,
        },
    });
};

module.exports = {
    getSprintById: controllerWrapper(getSprintById),
    addSprint: controllerWrapper(addSprint),
    updateSprintName: controllerWrapper(updateSprintName),
    removeSprint: controllerWrapper(removeSprint),
};