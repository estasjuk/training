const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const isValidProjectId = require('../../middlewares/isValidProjectId');
const isValidSprintId = require('../../middlewares/isValidSprintId');
const authenticate = require('../../middlewares/authenticate');
const validateBody = require('../../utils/validateBody');
// const validateSearchParams = require('../../utils/validateSearchParams');

const { getAllProjects, getProjectById, addProject, updateProjectName, removeProject, addUserToProject } = require('../../controllers/projectsControllers');
const { addProjectSchema, updateProjectSchema } = require('../../schemas/projectsSchema');

const { addSprintSchema, updateSprintSchema } = require('../../schemas/sprintsSchema');
const { getSprintById, addSprint, updateSprintName, removeSprint } = require('../../controllers/sprintsControllers');

const { addTaskSchema, findTaskByNameSchema } = require('../../schemas/tasksSchema');
const { addTask, findTaskByName, removeTask } = require('../../controllers/tasksControllers');


const router = express.Router();

// projects
router.get('/', authenticate, getAllProjects);
router.get('/:projectId', authenticate, isValidProjectId, getProjectById);
router.post('/', authenticate, validateBody(addProjectSchema), addProject);
router.put('/:projectId', authenticate, isValidProjectId, validateBody(updateProjectSchema), updateProjectName);
router.delete('/:projectId', authenticate, isValidProjectId, removeProject);
router.post('/:projectId/users', authenticate, isValidProjectId, addUserToProject);

// sprints
router.get('/:projectId/sprints/:sprintId', authenticate, isValidProjectId, isValidSprintId, getSprintById);
router.post('/:projectId/sprints', authenticate, isValidProjectId, validateBody(addSprintSchema), addSprint);
router.put('/:projectId/sprints/:sprintId', authenticate, isValidProjectId, isValidSprintId, validateBody(updateSprintSchema), updateSprintName);
router.delete('/:projectId/sprints/:sprintId', authenticate, isValidProjectId, isValidSprintId, authenticate, removeSprint);

// tasks
router.post('/:projectId/sprints/:sprintId/tasks', authenticate, isValidProjectId, isValidSprintId, validateBody(addTaskSchema), addTask );
router.get('/:projectId/sprints/:sprintId/tasks', authenticate, isValidProjectId, isValidSprintId, validator.query(findTaskByNameSchema), findTaskByName);
router.delete('/:projectId/sprints/:sprintId/tasks/:taskId', authenticate, isValidProjectId, isValidSprintId, removeTask);


module.exports = router;
