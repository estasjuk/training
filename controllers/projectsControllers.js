const { Project } = require('../models/projects');
const { Sprint } = require('../models/sprints');

const HttpError = require('../helpers/HttpError');

const { controllerWrapper } = require('../utils/contollerWrapper');


const getAllProjects = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  const projects = await Project.find(
    { owner },
    "-createdAt -updatedAt",
    { skip, limit })
    .populate("owner", "email"); // returns all data from the collection

  res.json({
    status: 'success',
    code: 200,
    data: {
      projects,
    },
  });
};

const getProjectById = async (req, res) => {
  const { _id: owner } = req.user;
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpError(404, 'Project not found');
  };

  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  const listOfSprints = await Sprint.find(
        { owner, project },
        "-createdAt -updatedAt",
        { skip, limit })
        .populate("owner", "email");
  
  res.json({
    status: 'success',
    code: 200,
    data: {
      project,
      listOfSprints,
    },
  });
};

const addProject = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Project.create({ ...req.body, owner });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      data: result,
    },
  });
};

const updateProjectName = async (req, res, next) => {
  const { projectId } = req.params;
  const result = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
  if (!result) {
    throw new HttpError(404, 'Project not found');
  }
  res.status(201).json({
    status: 'success',
    code: 201,
    result,
  });
};

// const updateStatusProject = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await Project.findByIdAndUpdate(contactId, req.body, { new: true });
//   if (!result) {
//     throw new HttpError(404, 'Not found');
//   }
//   res.status(201).json({
//     status: 'success',
//     code: 201,
//     result,
//   });
// };

const removeProject = async (req, res, next) => {
  const { projectId } = req.params;
  const result = await Project.findByIdAndDelete(projectId, req.body);
  if (!result) {
    throw new HttpError(404, 'Project not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      message: "Project deleted",
      result,
    },
  });
};

const addUserToProject = async (req, res) => {
//   await getProjectById();
//   const { userEmail } = req.query;
//   const { _id: owner } = req.user;
//   const user = await Project.create({ ...req.body, owner });
//  ;


};

module.exports = {
  getAllProjects: controllerWrapper(getAllProjects),
  getProjectById: controllerWrapper(getProjectById),
  addProject: controllerWrapper(addProject),
  updateProjectName: controllerWrapper(updateProjectName),
  // updateStatusProject: controllerWrapper(updateStatusProject),
  removeProject: controllerWrapper(removeProject),
  addUserToProject: controllerWrapper(addUserToProject),
};