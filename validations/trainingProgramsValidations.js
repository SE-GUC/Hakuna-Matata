const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
<<<<<<< HEAD
      name: Joi.string().min(3).required(),
      trainer: Joi.object().required(),
      description: Joi.string(),
      type: Joi.string(),
=======
      name: Joi.string()
        .min(3)
        .max(500)
        .required(),
      trainerId: Joi.string().integer(),
      trainerName: Joi.string(),
      description: Joi.string().required(),
      type: Joi.string().required(),
>>>>>>> master
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
<<<<<<< HEAD
      trainer: Joi.object(),
      description: Joi.string(),
      type: Joi.string(),
      duration: Joi.string(),
      applyDueDate: Joi.date(),
      startDate: Joi.date(),
      requiredSkills: Joi.array()
=======
      trainerId: Joi.number().integer(),
      trainerName: Joi.string(),
      description: Joi.string(),
      type: Joi.string(),
      duration: Joi.string(),
      applyDueDate: Joi.string(),
      startDate: Joi.string(),
      requiredSkills: Joi.string()
>>>>>>> master
    };

    return Joi.validate(request, updateSchema);
  }
};
