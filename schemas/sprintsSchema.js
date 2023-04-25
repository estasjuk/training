const Joi = require('joi')
    .extend(require('@joi/date'));

const addSprintSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" is required`,
        "string.empty": `"name" cannot be empty`,
    }),
    previousDays: Joi.boolean().required().messages({
        "any.required": `"Previous days" is required`
    }),  
    duration: Joi.number().required().messages({
        "any.required": `"duration" is required`,
        "number.empty": `"duration" cannot be empty`,
        "number.base": `"description" must be a number`
    }),
    startDate: Joi.date()
        .format('YYYY-MM-DD')
        .required()
        .messages({
        "any.required": `"Date end" is required`
    }),  
    endDate: Joi.date()
        .format('YYYY-MM-DD')
        .required()
        .messages({
        "any.required": `"Date end" is required`
    }),  
});

// const updateSprintSchema = Joi.object({
//     name: Joi.string(),
//     phone: Joi.string(),
//     email: Joi.string().email(),
// });



module.exports = {
  addSprintSchema,
  // updateSprintSchema,
};