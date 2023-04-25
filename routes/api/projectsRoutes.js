const express = require('express');

const isValidId = require('../../middlewares/isValidId');
const authenticate = require('../../middlewares/authenticate');
const validateBody = require('../../utils/validateBody');

const { getAllProjects, getProjectById, addProject, updateProject, updateStatusProject, removeProject } = require('../../controllers/projectsControllers');
const { addSprint } = require('../../controllers/sprintsControllers');
const { addProjectSchema, updateProjectSchema, updateFavoriteSchema } = require('../../schemas/projectsSchema');
const { addSprintSchema } = require('../../schemas/sprintsSchema');

const router = express.Router();

router.get('/', authenticate, getAllProjects);
router.get('/:projectId', authenticate, isValidId, getProjectById);
router.post('/', authenticate, validateBody(addProjectSchema), addProject);
router.put('/:projectId', authenticate, validateBody(updateProjectSchema), updateProject);
router.patch('/:projectId/favorite', authenticate, validateBody(updateFavoriteSchema), updateStatusProject);
router.delete('/:projectId', authenticate, removeProject);

router.post('/:projectId/sprints', authenticate, validateBody(addSprintSchema), addSprint);

module.exports = router;
