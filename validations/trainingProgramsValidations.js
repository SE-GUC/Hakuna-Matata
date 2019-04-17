const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().min(3).required(),
      trainer: Joi.object().required(),
      description: Joi.string(),
      type: Joi.string(),
      duration: Joi.string().required(),
      applyDueDate: Joi.date().required(),
      startDate: Joi.date().required(),
      requiredSkills: Joi.array()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string(),
      trainer: Joi.object(),
      description: Joi.string(),
      type: Joi.string(),
      duration: Joi.string(),
      applyDueDate: Joi.date(),
      startDate: Joi.string(),
      requiredSkills: Joi.array()
    };

    return Joi.validate(request, updateSchema);
  }
};
