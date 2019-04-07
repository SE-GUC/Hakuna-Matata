const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
        name: Joi.string()
        .min(3)
        .max(500)
        .required(),
        trainerId: Joi.number()
        .integer()
        .min(3)
        .max(500),
        trainerName: Joi.string()
        .min(3)
        .max(500),
        description: Joi.string()
        .min(3)
        .max(500)
        .required(),
        type: Joi.string()
        .min(3)
        .max(500)
        .required(),
        duration: Joi.string()
        .min(3)
        .max(500)
        .required(),
      applyDueDate: Joi.string()
        .min(3)
        .max(500)
        .required(),
      startDate: Joi.string()
        .min(3)
        .max(500)
        .required(),
    requiredSkills: Joi.string()
        .min(3)
        .max(500)
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
        name: Joi.string(),
        trainerId: Joi.number().integer(),
        trainerName: Joi.string(),
        description: Joi.string(),
        type: Joi.string(),
        duration: Joi.string(),
        applyDueDate: Joi.string(),
        startDate: Joi.string(),
        requiredSkills: Joi.string()
    };

    return Joi.validate(request, updateSchema);
  }
};
