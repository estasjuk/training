const { Project } = require('../models/projects');

const HttpError = require('../helpers/HttpError');

const { controllerWrapper } = require('../utils/contollerWrapper');


const getAllProjects = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const projects = await Project.find(
     { owner },
    "-createdAt -updatedAt",
    { skip, limit})
    .populate("owner", "email"); // returns all data from the collection
    
    res.json({
    status: 'success',
    code: 200,
    data: {
      result: projects
    },
  }); 
}

const getProjectById = async (req, res) => {
    const {contactId} = req.params;
    // const contact = await Contact.findOne({_id: contactId});
  const contact = await Project.findById(contactId);
    if(!contact) {
      throw new HttpError(404, 'Contact not found');
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      },
    });
}

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
 }

const updateProject =  async (req, res, next) => {
    const {contactId} = req.params;
    const result = await Project.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result) {
      throw new HttpError(404, 'Contact not found');
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        data: result,
      },
    });
}

const updateStatusProject =  async (req, res, next) => {
    const {contactId} = req.params;
    const result = await Project.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result) {
      throw new HttpError(404, 'Not found');
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        data: result,
      },
    });
}

const removeProject = async (req, res, next) => {
    const {contactId} = req.params;
    const result = await Project.findByIdAndDelete(contactId, req.body);
    if(!result) {
      throw new HttpError(404, 'Contact not found');
    }
     res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        message: "contact deleted",
        data: result,
      },
    });
}

module.exports = {
    getAllProjects: controllerWrapper(getAllProjects),
    getProjectById: controllerWrapper(getProjectById),
    addProject: controllerWrapper(addProject),
    updateProject: controllerWrapper(updateProject),
    updateStatusProject: controllerWrapper(updateStatusProject),
    removeProject: controllerWrapper(removeProject),
}