const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
        name: Joi.string()
        .min(3)
        .max(500)
        .required(),
      experienceLevel: Joi.number().integer(),
      contact: Joi.string()
        .min(3)
        .max(500)
        .required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
        name: Joi.string()
        .min(3)
        .max(500),
      experienceLevel: Joi.number()
        .integer()
        .min(1)
        .max(500),
      // certifactes: Joi.string().min(3).max(500),
      contact: Joi.string()
        .min(3)
        .max(500),
        certifactes:Joi.array()
    };

    return Joi.validate(request, updateSchema);
  }
};
