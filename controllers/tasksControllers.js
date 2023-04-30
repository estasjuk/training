const { Task } = require('../models/tasks');

const HttpError = require('../helpers/HttpError');

const { controllerWrapper } = require('../utils/contollerWrapper');

const addTask = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { projectId: project, sprintId: sprint } = req.params;
    const result = await Task.create({ ...req.body, owner, project, sprint});
    res.status(201).json({
        status: 'success',
        code: 201,
        result,
    });
};

const findTaskByName = async (req, res) => {
    const { _id: owner } = req.user;
    const { sprintId: sprint, projectId: project } = req.params;
    const { taskName } = req.query;
    console.log(taskName);
    console.log(sprint);
    console.log(project);
    const { page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;
    const allTasks = await Task.find(
        { owner, project, sprint },
        "-createdAt -updatedAt",
        { skip, limit })
        .populate("owner", "email");

    const normalizedFind = taskName.toLowerCase();
    const result = allTasks.filter(task => task.name.toLowerCase().includes(normalizedFind));
    
    res.json({
        status: 'success',
        code: 200,
        data: {
            result,
        },
    });
};

const removeTask = async (req, res, next) => {
    const { taskId } = req.params;
    const result = await Task.findByIdAndDelete(taskId, req.body);
    if (!result) {
        throw new HttpError(404, 'Task not found');
    }
    res.status(200).json({
        status: 'success',
        code: 200,
        data: {
            message: "Task deleted",
            result,
        },
    });
};

module.exports = {
    addTask: controllerWrapper(addTask),
    findTaskByName: controllerWrapper(findTaskByName),
    removeTask: controllerWrapper(removeTask),
};