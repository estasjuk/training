const Joi = require('joi');

const addProjectSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" is required`
    }),
    description: Joi.string().required().messages({
        "any.required": `"description" is required`,
        "string.empty": `"description" cannot be empty`,
        "string.base": `"description" must be a string`
    }),
});

const updateProjectSchema = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email(),
});



module.exports = {
  addProjectSchema,
  updateProjectSchema,
};