const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string()
        .min(3)
        .max(500)
        .required(),
      description: Joi.string()
        .min(3)
        .max(500)
        .required(),
      payment: Joi.string()
        .min(3)
        .max(500)
        .required(),
      places: Joi.number()
        .integer()
        .min(3)
        .max(500)
        .required(),
      availablePlaces: Joi.number()
        .integer()
        .min(3)
        .max(500)
        .required(),
      courseDuration: Joi.string()
        .min(3)
        .max(500)
        .required(),
      startDate: Joi.string()
        .min(3)
        .max(500)
        .required(),
      endDate: Joi.string()
        .min(3)
        .max(500)
        .required(),
      levelOfStudents: Joi.string()
        .min(3)
        .max(500)
        .required(),
      effort: Joi.string()
        .min(3)
        .max(500)
        .required(),
      available: Joi.boolean().required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string()
        .min(3)
        .max(500),
      places: Joi.number()
        .integer()
        .min(3)
        .max(500),
      availablePlaces: Joi.number()
        .integer()
        .min(3)
        .max(500),
      payment: Joi.string()
        .min(3)
        .max(500),
      description: Joi.string()
        .min(3)
        .max(500),
      courses: Joi.array()
        .min(3)
        .max(500),
      courseDuration: Joi.string()
        .min(3)
        .max(500),
      startDate: Joi.string()
        .min(3)
        .max(500),
      endDate: Joi.string()
        .min(3)
        .max(500),
      levelOfStudents: Joi.string()
        .min(3)
        .max(500),
      effort: Joi.string()
        .min(3)
        .max(500),
      available: Joi.boolean()
    };

    return Joi.validate(request, updateSchema);
  }
};
